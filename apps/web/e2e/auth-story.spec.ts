import { expect, test } from "@playwright/test";

import { AUTH_VIEWPORTS } from "./viewports";

for (const route of ["login", "register"]) {
  for (const [name, viewport] of Object.entries(AUTH_VIEWPORTS)) {
    test(`${route} story and form at ${name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(`/${route}`);
      await page.evaluate(() => document.fonts.ready);

      const story = page.getByRole("complementary");
      const main = page.getByRole("main");
      const home = page.getByRole("button", { name: "На главную" });
      for (const theme of ["light", "dark"]) {
        await page.evaluate((value) => {
          document.documentElement.classList.toggle("dark", value === "dark");
        }, theme);
        expect(
          await page.evaluate(() => document.documentElement.scrollHeight),
        ).toBeLessThanOrEqual(viewport.height);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
        ).toBeLessThanOrEqual(viewport.width);
        await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
        const email = main.getByLabel("Рабочий email", { exact: true });
        await expect(email).toBeVisible();
        expect((await email.boundingBox())?.width).toBeGreaterThan(240);
        await expect(home).toBeVisible();
        await expect(home).toHaveAttribute("href", "/");
        await home.focus();
        await page.keyboard.press("Tab");
        await page.keyboard.press("Shift+Tab");
        await expect(home).toBeFocused();
        await home.blur();

        if (viewport.width >= AUTH_VIEWPORTS.desktopBoundary.width) {
          await expect(story).toBeVisible();
          const storyBox = await story.boundingBox();
          const mainBox = await main.boundingBox();
          expect(storyBox!.x + storyBox!.width).toBeLessThanOrEqual(mainBox!.x);
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
          await logo.blur();
        }
        await page.screenshot({
          path: test.info().outputPath(`${route}-${name}-${theme}.png`),
          fullPage: true,
        });
      }
    });
  }
}
