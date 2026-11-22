import { createRef, forwardRef, type ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: forwardRef<HTMLAnchorElement, ComponentProps<"a">>(
    function MockLink(props, ref) {
      return <a {...props} ref={ref} />;
    },
  ),
}));

import { LogoLink } from "./logo-link";

describe("LogoLink", () => {
  it("forwards link props and ref while keeping the landing route", async () => {
    const onClick = vi.fn();
    const ref = createRef<HTMLAnchorElement>();

    render(<LogoLink className="custom-class" onClick={onClick} ref={ref} />);

    const link = screen.getByRole("link", { name: "синк /" });

    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveClass("inline-flex", "custom-class");
    expect(ref.current).toBe(link);

    await userEvent.click(link);

    expect(onClick).toHaveBeenCalledOnce();
  });
});
