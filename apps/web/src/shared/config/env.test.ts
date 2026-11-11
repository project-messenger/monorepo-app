import { describe, expect, it } from "vitest";

import { resolveApiUrl } from "./env";

describe("resolveApiUrl", () => {
  it.each([undefined, "", "   "])("для %j берёт адрес по умолчанию", (raw) => {
    expect(resolveApiUrl(raw)).toBe("http://localhost:3001");
  });

  it("убирает пробелы и завершающие слеши", () => {
    expect(resolveApiUrl(" https://api.example.com// ")).toBe(
      "https://api.example.com",
    );
  });
});
