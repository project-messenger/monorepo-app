import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LandingPage } from "./landing-page";

describe("LandingPage: security and registration CTA", () => {
  it("offers registration as a real link that opens a separate tab", () => {
    render(<LandingPage />);

    const link = screen.getByRole("link", { name: /Создать пространство/ });

    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/register");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(within(link).queryByRole("button")).not.toBeInTheDocument();
    expect(link.closest("button")).toBeNull();
  });

  it("shows access guarantees before the final registration call to action", () => {
    render(<LandingPage />);

    const security = screen.getByRole("region", {
      name: /Контекст общий\. Доступ — под контролем\./,
    });
    expect(
      within(security).getByText("ИИ видит только то, что доступно вам."),
    ).toBeVisible();
    expect(
      within(security).getByText(
        "Никаких действий от вашего имени без подтверждения.",
      ),
    ).toBeVisible();
    const cta = screen.getByRole("region", {
      name: /Пусть разговоры становятся результатом\./,
    });
    expect(
      security.compareDocumentPosition(cta) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
