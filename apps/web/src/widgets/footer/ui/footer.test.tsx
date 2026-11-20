import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "./footer";

describe("SiteFooter", () => {
  it("offers the home link and the two legal items from the landing design", () => {
    render(<SiteFooter />);

    const footer = within(screen.getByRole("contentinfo"));
    expect(footer.getByRole("link", { name: "синк /" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      footer.getByText("Общение и работа в одном контексте"),
    ).toBeVisible();
    expect(
      footer.getByRole("link", {
        name: "Конфиденциальность",
      }),
    ).toHaveAttribute("href", "#");
    expect(footer.getByRole("link", { name: "Условия" })).toHaveAttribute(
      "href",
      "#",
    );
    expect(footer.getAllByRole("link")).toHaveLength(3);
  });
});
