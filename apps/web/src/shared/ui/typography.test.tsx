import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Typography } from "./typography";

describe("Typography", () => {
  it.each([
    ["display-cta", "text-display-cta-mobile", "lg:text-display-cta"],
    [
      "heading-landing",
      "text-heading-landing-mobile",
      "lg:text-heading-landing",
    ],
    ["subtitle-landing", "text-subtitle-landing", null],
    ["body-landing", "text-body-landing", null],
  ] as const)(
    "keeps %s typography alongside a text color",
    (variant, mobile, desktop) => {
      render(
        <Typography as="h2" variant={variant} className="text-muted-foreground">
          Landing
        </Typography>,
      );
      const element = screen.getByRole("heading", { level: 2 });
      expect(element).toHaveClass(mobile, "text-muted-foreground");
      if (desktop) expect(element).toHaveClass(desktop);
      expect(element).not.toHaveClass("text-heading-section");
    },
  );
  it("по умолчанию рисует p с ролью body", () => {
    render(<Typography>Текст</Typography>);

    const element = screen.getByText("Текст");
    expect(element.tagName).toBe("P");
    expect(element).toHaveClass("text-body");
    expect(element).toHaveAttribute("data-slot", "typography");
  });

  it("проп as задаёт тег", () => {
    render(<Typography as="h2">Раздел</Typography>);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Раздел",
    );
  });

  it.each([
    ["h1", "text-heading-page"],
    ["h2", "text-heading-section"],
    ["h3", "text-heading-panel"],
    ["h4", "text-heading-subsection"],
    ["h5", "text-label-button"],
    ["h6", "text-label-field"],
    ["span", "text-body"],
    ["label", "text-label-field"],
  ] as const)("тег %s получает роль по умолчанию %s", (tag, role) => {
    render(<Typography as={tag}>Текст</Typography>);

    expect(screen.getByText("Текст")).toHaveClass(role);
  });

  it("проп variant переопределяет роль по тегу", () => {
    render(
      <Typography as="h1" variant="caption">
        Заголовок
      </Typography>,
    );

    const element = screen.getByRole("heading", { level: 1 });
    expect(element).toHaveClass("text-caption");
    expect(element).not.toHaveClass("text-heading-page");
  });

  it("className добавляется к классам роли", () => {
    render(<Typography className="text-muted-foreground">Текст</Typography>);

    const element = screen.getByText("Текст");
    expect(element).toHaveClass("text-body");
    expect(element).toHaveClass("text-muted-foreground");
  });

  it("у label принимает htmlFor и связывает подпись с полем", () => {
    render(
      <>
        <Typography as="label" htmlFor="email">
          Email
        </Typography>
        <input id="email" />
      </>,
    );

    expect(screen.getByLabelText("Email")).toBe(screen.getByRole("textbox"));
  });

  it("передаёт остальные HTML-атрибуты в тег", () => {
    render(
      <Typography as="span" id="hint" title="Подсказка">
        Текст
      </Typography>,
    );

    const element = screen.getByText("Текст");
    expect(element).toHaveAttribute("id", "hint");
    expect(element).toHaveAttribute("title", "Подсказка");
  });
});
