import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { WorkspaceSwitcher } from "./workspace-switcher";

describe("WorkspaceSwitcher", () => {
  it("рендерит кнопку с названием рабочего пространства", () => {
    render(<WorkspaceSwitcher>Команда разработки</WorkspaceSwitcher>);

    const button = screen.getByRole("button", { name: "Команда разработки" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("h-[50px]");
    expect(button).toHaveClass("rounded-lg");
    expect(button).toHaveClass("bg-sidebar-switcher");
  });

  it("вызывает onClick по клику", async () => {
    const onClick = vi.fn();
    render(
      <WorkspaceSwitcher onClick={onClick}>
        Команда разработки
      </WorkspaceSwitcher>,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Команда разработки" }),
    );

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("не вызывает onClick, когда disabled", async () => {
    const onClick = vi.fn();
    render(
      <WorkspaceSwitcher disabled onClick={onClick}>
        Команда разработки
      </WorkspaceSwitcher>,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Команда разработки" }),
    );

    expect(onClick).not.toHaveBeenCalled();
  });
});
