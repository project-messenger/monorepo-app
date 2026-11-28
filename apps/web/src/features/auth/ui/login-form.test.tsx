import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LoginForm } from "./login-form";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
}));

describe("LoginForm", () => {
  it("labels the email field consistently with registration", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("textbox", { name: "Рабочий email" }),
    ).toHaveAttribute("type", "email");
  });
});
