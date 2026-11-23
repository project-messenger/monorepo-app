import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
} from "./select";

const items = [
  { value: "all", label: "Все участники" },
  { value: "me", label: "Только я" },
];

function TestSelect({ variant }: { variant?: "default" | "app" | "settings" }) {
  return (
    <Select items={items} defaultValue="all">
      <SelectTrigger aria-label="Участники" variant={variant}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("показывает выбранное значение в триггере", () => {
    render(<TestSelect />);

    expect(
      screen.getByRole("combobox", { name: "Участники" }),
    ).toHaveTextContent("Все участники");
  });

  it("открывает список по клику и меняет значение", async () => {
    render(<TestSelect variant="app" />);

    await userEvent.click(screen.getByRole("combobox", { name: "Участники" }));
    await userEvent.click(
      await screen.findByRole("option", { name: "Только я" }),
    );

    expect(
      screen.getByRole("combobox", { name: "Участники" }),
    ).toHaveTextContent("Только я");
  });

  it("по умолчанию сохраняет вид default", () => {
    render(<TestSelect />);

    const trigger = screen.getByRole("combobox", { name: "Участники" });
    expect(trigger).toHaveClass("h-8");
    expect(trigger).toHaveClass("rounded-lg");
  });

  it.each([
    ["app", "h-12", "rounded-md"],
    ["settings", "h-11", "rounded-sm"],
  ] as const)(
    "вариант %s задаёт высоту %s и радиус %s",
    (variant, height, radius) => {
      render(<TestSelect variant={variant} />);

      const trigger = screen.getByRole("combobox", { name: "Участники" });
      expect(trigger).toHaveClass(height);
      expect(trigger).toHaveClass(radius);
      expect(trigger).toHaveClass("bg-input-background");
    },
  );

  it("selectTriggerVariants без аргументов совпадает с default", () => {
    expect(selectTriggerVariants()).toBe(
      selectTriggerVariants({ variant: "default" }),
    );
  });
});
