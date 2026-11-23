import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ROUTES } from "@/shared/config";
import { LandingHeader } from "./landing-header";

describe("LandingHeader", () => {
  it("renders page anchors and authentication links as links", () => {
    render(<LandingHeader />);

    expect(screen.getByRole("link", { name: "Продукт" })).toHaveAttribute(
      "href",
      "#product",
    );
    expect(screen.getByRole("link", { name: "Для команд" })).toHaveAttribute(
      "href",
      "#teams",
    );
    expect(screen.getByRole("link", { name: "Безопасность" })).toHaveAttribute(
      "href",
      "#security",
    );

    const loginLink = screen.getByRole("link", { name: "Войти" });
    expect(loginLink).toHaveAttribute("href", ROUTES.LOGIN);
    expect(loginLink).toHaveAttribute("target", "_blank");
    expect(loginLink).toHaveAttribute("rel", "noopener noreferrer");

    const registerLink = screen.getByRole("link", {
      name: "Создать пространство",
    });
    expect(registerLink).toHaveAttribute("href", ROUTES.REGISTER);
    expect(registerLink).toHaveAttribute("target", "_blank");
    expect(registerLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("closes the mobile menu after following a section anchor", async () => {
    const user = userEvent.setup();
    render(<LandingHeader />);

    await user.click(screen.getByRole("button", { name: "Открыть меню" }));

    const dialog = await screen.findByRole("dialog");
    const mobileNavigation = within(dialog).getByRole("navigation", {
      name: "Навигация по странице",
    });
    const productLink = within(mobileNavigation).getByRole("link", {
      name: "Продукт",
    });

    expect(productLink).toHaveAttribute("href", "#product");
    await user.click(productLink);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("opens authentication destinations in a new tab and closes the mobile menu", async () => {
    const user = userEvent.setup();
    render(<LandingHeader />);

    await user.click(screen.getByRole("button", { name: "Открыть меню" }));

    const dialog = await screen.findByRole("dialog");
    const registerLink = within(dialog).getByRole("link", {
      name: "Создать пространство",
    });

    expect(registerLink).toHaveAttribute("href", ROUTES.REGISTER);
    expect(registerLink).toHaveAttribute("target", "_blank");
    expect(registerLink).toHaveAttribute("rel", "noopener noreferrer");

    await user.click(registerLink);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
