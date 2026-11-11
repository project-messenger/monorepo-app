import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SiteHeader } from "./site-header";

// Вне App Router у next/link нет роутера. Заменяем простой ссылкой без
// перехода: jsdom навигацию не умеет, а проверяем мы только закрытие меню.
vi.mock("next/link", () => ({
  default: ({ href, ...props }: React.ComponentProps<"a">) => (
    <a
      href={href}
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        e.preventDefault();
      }}
    />
  ),
}));

async function openMobileMenu() {
  await userEvent.click(screen.getByRole("button", { name: "Открыть меню" }));
  return screen.findByRole("dialog");
}

describe("SiteHeader: мобильное меню", () => {
  it.each(["Тарифы", "Войти", "Начать бесплатно"])(
    "закрывается после клика по «%s»",
    async (label) => {
      render(<SiteHeader />);
      const menu = await openMobileMenu();

      await userEvent.click(within(menu).getByRole("button", { name: label }));

      await waitFor(() =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
      );
    },
  );

  it("ссылки в меню ведут туда же, что и в шапке", async () => {
    render(<SiteHeader />);
    const menu = await openMobileMenu();

    expect(
      within(menu).getByRole("button", { name: "Тарифы" }),
    ).toHaveAttribute("href", "/#pricing");
  });
});
