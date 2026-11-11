import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { sessionQueryKey } from "@/shared/api";

import { useLogout } from "./use-logout";

vi.mock("@/shared/api", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/shared/api")>()),
  logout: vi.fn().mockResolvedValue(undefined),
}));

function setup() {
  const queryClient = new QueryClient();
  queryClient.setQueryData(sessionQueryKey, {
    id: "6f1c1c3e-0000-4000-8000-000000000000",
    email: "you@company.ru",
    name: "Иван",
  });
  queryClient.setQueryData(["chats"], [{ id: 1, title: "Секретный чат" }]);

  const { result } = renderHook(() => useLogout(), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
  return { queryClient, result };
}

describe("useLogout", () => {
  it("обнуляет сессию и стирает данные прошлого пользователя", async () => {
    const { queryClient, result } = setup();

    await act(() => result.current.mutateAsync());

    expect(queryClient.getQueryData(sessionQueryKey)).toBeNull();
    expect(queryClient.getQueryData(["chats"])).toBeUndefined();
  });
});
