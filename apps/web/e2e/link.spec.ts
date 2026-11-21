import { expect, test } from "@playwright/test";

import { LANDING_VIEWPORT_WIDTHS } from "./viewports";

for (const [name, width] of Object.entries(LANDING_VIEWPORT_WIDTHS)) {
  test(`inline link typography and keyboard focus at ${name}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/login");
    await page.evaluate(() => document.fonts.ready);

    const link = page.locator('a[data-slot="link"]');
    await expect(link).toHaveAttribute("href", "#");

    for (const theme of ["light", "dark"]) {
      await page.evaluate((value) => {
        document.documentElement.classList.toggle("dark", value === "dark");
      }, theme);
      await expect(link).toBeVisible();
      await expect(link).toHaveCSS("font-size", "14px");
      await expect(link).toHaveCSS("font-weight", "400");
      await expect(link).toHaveCSS("line-height", "20.3px");
      await link.focus();
      await page.keyboard.press("Shift+Tab");
      await page.keyboard.press("Tab");
      await expect(link).toBeFocused();
      await expect(link).toHaveCSS("outline-style", "solid");
      await expect(link).toHaveCSS("outline-width", "2px");
      await link.hover();
      await expect(link).toHaveCSS("text-decoration-line", "underline");
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    }
  });
}
