import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NavigationItem } from "./navigation-item";

describe("NavigationItem", () => {
  it("по умолчанию рендерит ссылку без aria-current", () => {
    render(<NavigationItem href="/p">Проект Alpha</NavigationItem>);

    const link = screen.getByRole("link", { name: "Проект Alpha" });
    expect(link).toHaveAttribute("href", "/p");
    expect(link).not.toHaveAttribute("aria-current");
    expect(link).toHaveClass("text-sidebar-item-foreground");
  });

  it("вариант selected помечает ссылку как текущую страницу", () => {
    render(
      <NavigationItem href="/p" variant="selected">
        Проект Alpha
      </NavigationItem>,
    );

    const link = screen.getByRole("link", { name: "Проект Alpha" });
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveClass("bg-sidebar-accent");
  });

  it("поддерживает render для подстановки своего элемента", () => {
    render(
      <NavigationItem render={<button type="button" />}>
        Проект Alpha
      </NavigationItem>,
    );

    expect(screen.getByRole("button", { name: "Проект Alpha" })).toHaveClass(
      "h-[34px]",
    );
  });

  it("добавляет className, не теряя классы варианта", () => {
    render(
      <NavigationItem href="/p" className="w-[216px]">
        Проект Alpha
      </NavigationItem>,
    );

    const link = screen.getByRole("link", { name: "Проект Alpha" });
    expect(link).toHaveClass("w-[216px]");
    expect(link).toHaveClass("rounded-lg");
  });
});
