import { expect, test } from "@playwright/test";

import { LANDING_VIEWPORT_WIDTHS } from "./viewports";

for (const route of ["login", "register"]) {
  for (const [name, width] of Object.entries(LANDING_VIEWPORT_WIDTHS)) {
    test(`${route} story and form at ${name}`, async ({ page }) => {
      await page.setViewportSize({
        width,
        height: name === "desktop" ? 1000 : 900,
      });
      await page.goto(`/${route}`);
      await page.evaluate(() => document.fonts.ready);

      const story = page.getByRole("complementary");
      const main = page.getByRole("main");
      for (const theme of ["light", "dark"]) {
        await page.evaluate((value) => {
          document.documentElement.classList.toggle("dark", value === "dark");
        }, theme);
        await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(
          main.getByLabel(route === "login" ? "Email" : "Рабочий email", {
            exact: true,
          }),
        ).toBeVisible();
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
        ).toBeLessThanOrEqual(width);
        if (name === "desktop") {
          await expect(story).toBeVisible();
          const box = await story.boundingBox();
          expect(box?.x).toBe(0);
          expect(box?.width).toBe(568);
          expect(box?.height).toBe(1000);
          expect((await main.boundingBox())?.x).toBeGreaterThanOrEqual(568);
          await expect(story.getByRole("heading", { level: 2 })).toHaveCSS(
            "font-size",
            "48px",
          );
          await expect(story.getByText("синк /", { exact: true })).toHaveCSS(
            "font-size",
            "24px",
          );
          await expect(story.getByRole("link")).toHaveCount(0);
        } else {
          await expect(story).toBeHidden();
          const logo = page.getByRole("link", { name: "синк /" });
          await expect(logo).toBeVisible();
          await expect(logo).toHaveAttribute("href", "/");
          await logo.focus();
          await page.keyboard.press("Tab");
          await page.keyboard.press("Shift+Tab");
          await expect(logo).toBeFocused();
          await expect(logo).toHaveCSS("outline-style", "solid");
          expect(
            await page.evaluate(() => document.documentElement.scrollHeight),
          ).toBeLessThan(1000);
        }
        await page.screenshot({
          path: test.info().outputPath(`${route}-${name}-${theme}.png`),
          fullPage: true,
        });
      }
    });
  }
}
