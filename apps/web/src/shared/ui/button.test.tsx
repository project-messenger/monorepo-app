import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./button";

describe("Button", () => {
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
});
