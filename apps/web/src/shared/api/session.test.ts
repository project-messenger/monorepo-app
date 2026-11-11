import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchSession } from "./session";

const user = {
  id: "7f1c3a52-9a0e-4b3a-8f53-2a5f2b6f1e10",
  email: "you@company.ru",
  name: "Иван",
};

function mockFetch(response: Response) {
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchSession", () => {
  it("запрашивает /auth/me с cookie и возвращает пользователя", async () => {
    const fetchMock = mockFetch(Response.json(user));

    await expect(fetchSession()).resolves.toEqual(user);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3001/auth/me",
      expect.objectContaining({ credentials: "include" }),
    );
  });

  it("возвращает null, если сессии нет", async () => {
    mockFetch(new Response(null, { status: 401 }));

    await expect(fetchSession()).resolves.toBeNull();
  });

  it("падает на ошибке сервера", async () => {
    mockFetch(new Response(null, { status: 500 }));

    await expect(fetchSession()).rejects.toThrow("GET /auth/me: 500");
  });

  it("падает, если ответ не совпадает с UserSchema", async () => {
    mockFetch(Response.json({ id: "not-a-uuid" }));

    await expect(fetchSession()).rejects.toThrow();
  });
});
