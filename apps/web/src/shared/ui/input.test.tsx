import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input, inputVariants } from "./input";

describe("Input", () => {
  it("по умолчанию сохраняет прежний вид (вариант default)", () => {
    render(<Input aria-label="Email" />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveClass("h-8");
    expect(input).toHaveClass("rounded-lg");
    expect(input).toHaveClass("border-input");
  });

  it.each([
    ["auth", "h-[52px]", "rounded-xl"],
    ["app", "h-12", "rounded-md"],
    ["settings", "h-11", "rounded-sm"],
  ] as const)(
    "вариант %s задаёт высоту %s и радиус %s",
    (variant, height, radius) => {
      render(<Input aria-label="Поле" variant={variant} />);

      const input = screen.getByLabelText("Поле");
      expect(input).toHaveClass(height);
      expect(input).toHaveClass(radius);
    },
  );

  it("вариант auth использует отдельную границу макета", () => {
    render(<Input aria-label="Поле" variant="auth" />);

    expect(screen.getByLabelText("Поле")).toHaveClass(
      "border-input-auth-border",
    );
  });

  it("варианты app и settings используют фон поля из токена", () => {
    render(
      <>
        <Input aria-label="App" variant="app" />
        <Input aria-label="Settings" variant="settings" />
      </>,
    );

    expect(screen.getByLabelText("App")).toHaveClass("bg-input-background");
    expect(screen.getByLabelText("Settings")).toHaveClass(
      "bg-input-background",
    );
  });

  it("добавляет className, не теряя классы варианта", () => {
    render(<Input aria-label="Поле" variant="app" className="w-64" />);

    const input = screen.getByLabelText("Поле");
    expect(input).toHaveClass("w-64");
    expect(input).toHaveClass("h-12");
  });

  it("inputVariants без аргументов совпадает с вариантом default", () => {
    expect(inputVariants()).toBe(inputVariants({ variant: "default" }));
  });
});
