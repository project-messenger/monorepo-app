import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Textarea, textareaVariants } from "./textarea";

describe("Textarea", () => {
  it("по умолчанию сохраняет прежний вид (вариант default)", () => {
    render(<Textarea aria-label="Описание" />);

    const textarea = screen.getByLabelText("Описание");
    expect(textarea).toHaveClass("min-h-16");
    expect(textarea).toHaveClass("rounded-lg");
  });

  it("вариант app задаёт высоту 86, радиус и фон из токенов макета", () => {
    render(<Textarea aria-label="Описание" variant="app" />);

    const textarea = screen.getByLabelText("Описание");
    expect(textarea).toHaveClass("min-h-[86px]");
    expect(textarea).toHaveClass("rounded-md");
    expect(textarea).toHaveClass("bg-input-background");
  });

  it("добавляет className, не теряя классы варианта", () => {
    render(<Textarea aria-label="Описание" variant="app" className="w-64" />);

    const textarea = screen.getByLabelText("Описание");
    expect(textarea).toHaveClass("w-64");
    expect(textarea).toHaveClass("min-h-[86px]");
  });

  it("textareaVariants без аргументов совпадает с вариантом default", () => {
    expect(textareaVariants()).toBe(textareaVariants({ variant: "default" }));
  });
});
