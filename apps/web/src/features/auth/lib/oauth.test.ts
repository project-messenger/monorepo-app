import { describe, expect, it } from "vitest";

import { buildOAuthUrl, oauthErrorMessage, safeReturnTo } from "./oauth";

describe("safeReturnTo", () => {
  it.each(["/", "/chats", "/chats/42?tab=files#top"])(
    "пропускает внутренний путь %s",
    (path) => {
      expect(safeReturnTo(path)).toBe(path);
    },
  );

  it.each([
    null,
    undefined,
    "",
    "chats",
    "https://evil.com",
    "//evil.com",
    "/\\evil.com",
    "\\\\evil.com",
    "/\t/evil.com",
    "/\n/evil.com",
    "/\r\n/evil.com",
    "/.//evil.com",
    "/a/..//evil.com",
    "javascript:alert(1)",
  ])("заменяет %j на главную", (value) => {
    expect(safeReturnTo(value)).toBe("/");
  });

  it("возвращает путь в нормализованном виде", () => {
    expect(safeReturnTo("/chats/\t42")).toBe("/chats/42");
  });
});

describe("buildOAuthUrl", () => {
  it("ведёт на бэкенд с безопасным returnTo", () => {
    const url = new URL(buildOAuthUrl("github", "/chats?id=1"));
    expect(url.origin + url.pathname).toBe("http://localhost:3001/auth/github");
    expect(url.searchParams.get("returnTo")).toBe("/chats?id=1");
  });

  it("не пропускает внешний returnTo", () => {
    const url = new URL(buildOAuthUrl("google", "https://evil.com"));
    expect(url.searchParams.get("returnTo")).toBe("/");
  });
});

describe("oauthErrorMessage", () => {
  it("возвращает null без кода ошибки", () => {
    expect(oauthErrorMessage(null)).toBeNull();
  });

  it.each(["__proto__", "constructor", "toString", "hasOwnProperty"])(
    "для унаследованного ключа %s возвращает строку общей ошибки",
    (code) => {
      expect(oauthErrorMessage(code)).toBe(oauthErrorMessage("oauth_failed"));
    },
  );

  it("для неизвестного кода показывает общую ошибку", () => {
    expect(oauthErrorMessage("whatever")).toBe(
      oauthErrorMessage("oauth_failed"),
    );
  });
});
