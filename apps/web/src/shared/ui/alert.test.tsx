import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert, AlertDescription, AlertTitle } from "./alert";

describe("Alert", () => {
  it("имеет роль alert и отображает содержимое", () => {
    render(
      <Alert>
        <AlertTitle>Заголовок</AlertTitle>
        <AlertDescription>Описание</AlertDescription>
      </Alert>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Заголовок");
    expect(screen.getByRole("alert")).toHaveTextContent("Описание");
  });

  it("по умолчанию использует вариант default", () => {
    render(<Alert>Текст</Alert>);

    expect(screen.getByRole("alert")).toHaveClass("bg-card");
  });

  it.each([
    ["success", "bg-success-background"],
    ["destructive", "bg-destructive-background"],
    ["warning", "bg-warning-background"],
  ] as const)("вариант %s использует токен %s", (variant, expected) => {
    render(<Alert variant={variant}>Текст</Alert>);

    expect(screen.getByRole("alert")).toHaveClass(expected);
  });

  it("добавляет className, не теряя классы варианта", () => {
    render(
      <Alert variant="warning" className="w-64">
        Текст
      </Alert>,
    );

    expect(screen.getByRole("alert")).toHaveClass("w-64");
    expect(screen.getByRole("alert")).toHaveClass("bg-warning-background");
  });
});
