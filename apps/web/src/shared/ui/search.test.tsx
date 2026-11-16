import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Search, searchVariants } from "./search";

describe("Search", () => {
  it("рендерит поле поиска с подсказкой ⌘ K по умолчанию", () => {
    render(<Search aria-label="Поиск" />);

    expect(
      screen.getByRole("searchbox", { name: "Поиск" }),
    ).toBeInTheDocument();
    expect(screen.getByText("⌘ K")).toBeInTheDocument();
  });

  it("скрывает подсказку, когда shortcut={null}", () => {
    render(<Search aria-label="Поиск" shortcut={null} />);

    expect(screen.queryByText("⌘ K")).not.toBeInTheDocument();
  });

  it("принимает ввод пользователя", async () => {
    render(<Search aria-label="Поиск" />);

    const input = screen.getByRole("searchbox", { name: "Поиск" });
    await userEvent.type(input, "релиз");

    expect(input).toHaveValue("релиз");
  });

  it("применяет размеры макета и className", () => {
    const { container } = render(
      <Search aria-label="Поиск" className="w-64" />,
    );

    const root = container.querySelector("[data-slot=search]");
    expect(root).toHaveClass("h-9");
    expect(root).toHaveClass("rounded-sm");
    expect(root).toHaveClass("bg-input-search");
    expect(root).toHaveClass("w-64");
  });

  it("searchVariants без аргументов совпадает с global", () => {
    expect(searchVariants()).toBe(searchVariants({ variant: "global" }));
  });
});
