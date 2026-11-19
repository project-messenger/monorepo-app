import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { StyledLink } from "./styled-link";

it("keeps an anchor keyboard accessible and forwards click and ref", async () => {
  const user = userEvent.setup();
  const ref = createRef<HTMLAnchorElement>();
  const onClick = vi.fn((event: React.MouseEvent<HTMLAnchorElement>) =>
    event.preventDefault(),
  );
  render(
    <StyledLink href="/register" ref={ref} onClick={onClick}>
      Register
    </StyledLink>,
  );
  const link = screen.getByRole("link", { name: "Register" });
  expect(link).toHaveAttribute("href", "/register");
  expect(ref.current).toBe(link);
  await user.tab();
  expect(link).toHaveFocus();
  await user.keyboard("{Enter}");
  expect(onClick).toHaveBeenCalledOnce();
});

it("preserves external target, rel and Next URL objects for the inline variant", () => {
  render(
    <StyledLink
      variant="inline"
      href={{ pathname: "/register", query: { from: "landing" } }}
      target="_blank"
      rel="noopener noreferrer"
    >
      Register
    </StyledLink>,
  );
  const link = screen.getByRole("link", { name: "Register" });
  expect(link).toHaveAttribute("href", "/register?from=landing");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
  expect(link).toHaveClass("hover:underline");
});
