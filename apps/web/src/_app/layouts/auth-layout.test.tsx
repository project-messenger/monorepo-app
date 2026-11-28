import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AuthLayout } from "./auth-layout";

describe("AuthLayout", () => {
  it("keeps the form as the main content and the shared story as a complementary region", () => {
    render(
      <AuthLayout params={Promise.resolve({})}>
        <h1>Вход в аккаунт</h1>
        <form aria-label="Вход">
          <button>Войти</button>
        </form>
      </AuthLayout>,
    );

    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Вход в аккаунт",
    );
    expect(main.getByRole("form", { name: "Вход" })).toBeInTheDocument();
    const story = within(screen.getByRole("complementary"));
    expect(story.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Хорошая работа начинается с разговора.",
    );
    expect(screen.getByRole("link", { name: "синк /" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
