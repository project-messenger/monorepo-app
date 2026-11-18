import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, buttonVariants } from "./button";

describe("Button", () => {
  it("keeps the sidebar CTA palette and alignment when rendered as a link", () => {
    render(
      <Button
        variant="sidebar-accent"
        size="landing-cta"
        nativeButton={false}
        render={
          <a
            href="/register"
            target="_blank"
            rel="noopener noreferrer"
            role="link"
          />
        }
      >
        Register
      </Button>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass(
      "bg-sidebar-primary",
      "text-sidebar-primary-foreground",
      "hover:bg-sidebar-primary/80",
      "focus-visible:border-sidebar-ring",
      "focus-visible:ring-sidebar-ring/50",
      "justify-start",
      "px-4.5",
      "h-12",
    );
    expect(link).not.toHaveClass("bg-accent", "justify-center", "px-5");
  });
  it("calls onClick by click", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Отправить</Button>);

    await userEvent.click(screen.getByRole("button", { name: "Отправить" }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Отправить
      </Button>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Отправить" }));

    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it.each([
    ["surface", "bg-surface"],
    ["soft", "bg-muted"],
    ["accent", "bg-accent"],
  ] as const)("вариант %s использует токен %s", (variant, expected) => {
    render(<Button variant={variant}>Кнопка</Button>);

    expect(screen.getByRole("button")).toHaveClass(expected);
  });

  it.each([
    ["app", "h-10"],
    ["app-lg", "h-11"],
    ["landing", "h-12"],
    ["auth", "h-[50px]"],
  ] as const)("размер %s задаёт высоту %s", (size, expected) => {
    render(<Button size={size}>Кнопка</Button>);

    expect(screen.getByRole("button")).toHaveClass(expected);
  });

  it("buttonVariants по умолчанию не меняет существующий вариант default", () => {
    expect(buttonVariants()).toContain("bg-primary");
    expect(buttonVariants()).toContain("h-8");
  });
});
