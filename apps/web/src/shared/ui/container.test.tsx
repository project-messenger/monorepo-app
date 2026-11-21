import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Container } from "./container";

it("groups content without adding a landmark and forwards the element ref", () => {
  const ref = createRef<HTMLDivElement>();
  render(
    <Container ref={ref} aria-label="Content" className="py-8">
      <h2>Section</h2>
    </Container>,
  );
  const container = screen.getByLabelText("Content");
  expect(container.tagName).toBe("DIV");
  expect(container).not.toHaveAttribute("role");
  expect(container).toContainElement(
    screen.getByRole("heading", { name: "Section" }),
  );
  expect(container).toHaveClass("py-8", "max-w-page");
  expect(ref.current).toBe(container);
});
