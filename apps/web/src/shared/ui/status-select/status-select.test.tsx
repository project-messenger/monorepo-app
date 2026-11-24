import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { StatusSelect } from "./status-select";

describe("StatusSelect", () => {
  it("по умолчанию показывает статус «К выполнению»", () => {
    render(<StatusSelect />);

    expect(screen.getByRole("combobox")).toHaveTextContent("К выполнению");
  });

  it("показывает переданный defaultValue", () => {
    render(<StatusSelect defaultValue="review" />);

    expect(screen.getByRole("combobox")).toHaveTextContent("На проверке");
  });

  it("применяет className к триггеру", () => {
    render(<StatusSelect className="w-[194px]" />);

    expect(screen.getByRole("combobox")).toHaveClass("w-[194px]");
  });

  it("открывает список статусов по клику", async () => {
    const user = userEvent.setup();
    render(<StatusSelect />);

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findAllByRole("option")).toHaveLength(4);
  });

  it("вызывает onValueChange при выборе статуса", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<StatusSelect onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "Готово" }));

    expect(onValueChange).toHaveBeenCalledWith("done");
  });

  it("не открывается в состоянии disabled", async () => {
    const user = userEvent.setup();
    render(<StatusSelect disabled />);

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    expect(trigger).toBeDisabled();
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });
});
