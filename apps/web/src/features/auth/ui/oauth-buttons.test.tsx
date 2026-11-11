import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { OAuthButtons } from "./oauth-buttons";

const searchParams = vi.hoisted(() => ({ current: new URLSearchParams() }));

vi.mock("next/navigation", () => ({
  useSearchParams: () => searchParams.current,
}));

afterEach(() => {
  searchParams.current = new URLSearchParams();
});

function hrefOf(name: string) {
  return new URL(screen.getByRole("button", { name }).getAttribute("href")!);
}

describe("OAuthButtons", () => {
  it("показывает кнопку для каждого провайдера", () => {
    render(<OAuthButtons intent="login" />);

    expect(hrefOf("Войти через Google").pathname).toBe("/auth/google");
    expect(hrefOf("Войти через GitHub").pathname).toBe("/auth/github");
  });

  it("подписывает кнопки под регистрацию", () => {
    render(<OAuthButtons intent="register" />);

    expect(
      screen.getByRole("button", { name: "Продолжить с Google" }),
    ).toBeInTheDocument();
  });

  it("передаёт returnTo из URL страницы", () => {
    searchParams.current = new URLSearchParams("returnTo=/chats");
    render(<OAuthButtons intent="login" />);

    expect(hrefOf("Войти через GitHub").searchParams.get("returnTo")).toBe(
      "/chats",
    );
  });

  it("показывает ошибку, с которой вернул бэкенд", () => {
    searchParams.current = new URLSearchParams("error=access_denied");
    render(<OAuthButtons intent="login" />);

    expect(
      screen.getByText("Вход отменён: доступ не был предоставлен."),
    ).toBeInTheDocument();
  });
});
