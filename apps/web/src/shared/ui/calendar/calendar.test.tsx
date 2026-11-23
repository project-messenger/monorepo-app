import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Calendar } from "./calendar";

// Фиксированный месяц, чтобы тест не зависел от текущей даты.
const month = new Date(2026, 0, 1);

function dayButton(day: number) {
  return screen.getByRole("button", {
    name: new RegExp(`January ${day}(st|nd|rd|th),`),
  });
}

describe("Calendar", () => {
  it("переводит фокус на соседний день стрелкой", async () => {
    render(<Calendar mode="single" defaultMonth={month} />);

    await userEvent.click(dayButton(14));
    await userEvent.keyboard("{ArrowRight}");

    expect(dayButton(15)).toHaveFocus();
  });
});
