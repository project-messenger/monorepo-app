import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { LandingHeaderAuthLinks } from "./landing-header-auth-links";

describe("LandingHeaderAuthLinks", () => {
  it("renders desktop authentication links with desktop button variants", () => {
    render(<LandingHeaderAuthLinks mode="desktop" />);

    const loginLink = screen.getByRole("link", { name: "Войти" });
    const registerLink = screen.getByRole("link", {
      name: "Создать пространство",
    });

    expect(loginLink).toHaveAttribute("href", ROUTES.LOGIN);
    expect(loginLink).toHaveAttribute("target", "_blank");
    expect(loginLink).toHaveClass("hover:bg-muted");
    expect(registerLink).toHaveAttribute("href", ROUTES.REGISTER);
    expect(registerLink).toHaveClass("bg-primary");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders mobile links with mobile button variants and closes the sheet", async () => {
    const user = userEvent.setup();

    render(
      <Sheet>
        <SheetTrigger render={<Button>Открыть меню</Button>} />
        <SheetContent>
          <LandingHeaderAuthLinks mode="mobile" />
        </SheetContent>
      </Sheet>,
    );

    await user.click(screen.getByRole("button", { name: "Открыть меню" }));

    const dialog = await screen.findByRole("dialog");
    const loginLink = within(dialog).getByRole("link", { name: "Войти" });
    const registerLink = within(dialog).getByRole("link", {
      name: "Создать пространство",
    });

    expect(loginLink).toHaveAttribute("href", ROUTES.LOGIN);
    expect(loginLink).toHaveClass("border-border");
    expect(registerLink).toHaveAttribute("href", ROUTES.REGISTER);
    expect(registerLink).toHaveClass("bg-primary");

    await user.click(registerLink);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
