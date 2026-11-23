import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { PasswordInput } from "./password-input";

describe("PasswordInput", () => {
  it("shows and hides the password", async () => {
    render(<PasswordInput aria-label="Пароль" />);
    const input = screen.getByLabelText("Пароль");
    expect(input).toHaveAttribute("type", "password");

    await userEvent.click(
      screen.getByRole("button", { name: "Показать пароль" }),
    );
    expect(input).toHaveAttribute("type", "text");

    await userEvent.click(
      screen.getByRole("button", { name: "Скрыть пароль" }),
    );
    expect(input).toHaveAttribute("type", "password");
  });

  it("добавляет className, не теряя отступ под кнопку", () => {
    render(<PasswordInput aria-label="Пароль" className="w-64" />);
    const input = screen.getByLabelText("Пароль");

    expect(input).toHaveClass("w-64");
    expect(input).toHaveClass("pr-9");
  });
});
