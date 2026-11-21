import { expect, test } from "@playwright/test";

import { LANDING_VIEWPORT_WIDTHS } from "./viewports";

for (const [name, width] of Object.entries(LANDING_VIEWPORT_WIDTHS)) {
  test(`landing layout and links at ${name}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const security = page.locator(
      'section[aria-labelledby="security-heading"]',
    );
    const cta = page.locator('section[aria-labelledby="cta-heading"]');
    const footer = page.getByRole("contentinfo");
    const legalLinks = footer.locator("nav a");

    await expect(security).toBeVisible();
    await expect(cta).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await expect(legalLinks).toHaveCount(2);
    for (const link of await legalLinks.all())
      await expect(link).toHaveAttribute("href", "#");
    await legalLinks.first().focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(legalLinks.first()).toBeFocused();
    await expect(legalLinks.first()).toHaveCSS("outline-style", "solid");
    await expect(legalLinks.first()).toHaveCSS("outline-width", "2px");
    const normalColor = await legalLinks
      .first()
      .evaluate((link) => getComputedStyle(link).color);
    await legalLinks.first().hover();
    await expect(legalLinks.first()).not.toHaveCSS("color", normalColor);
    await page.mouse.move(0, 0);
    await expect(legalLinks.first()).toHaveCSS("color", normalColor);
    await legalLinks.first().blur();

    await expect(security.locator("h2")).toHaveCSS(
      "font-size",
      name === "desktop" ? "30px" : "26px",
    );
    await expect(cta.locator("h2")).toHaveCSS(
      "font-size",
      name === "desktop" ? "46px" : "32px",
    );
    await expect(cta.locator("p")).toHaveCSS("font-size", "17px");
    await expect(footer.locator("p")).toHaveCSS("font-size", "15px");
    await expect(footer.locator("p")).toHaveCSS("font-weight", "400");
    await expect(footer.locator("p")).toHaveCSS("line-height", "21.75px");

    if (name === "desktop") {
      const band = await security
        .locator('[data-slot="container"] > div')
        .boundingBox();
      expect(band?.x).toBe(64);
      expect(band?.width).toBe(1312);
      expect(band?.height).toBe(178);
      expect((await security.boundingBox())?.height).toBe(220);
      expect((await cta.boundingBox())?.height).toBe(280);
      const button = await cta.getByRole("link").boundingBox();
      expect(button?.x).toBe(1020);
      expect(button?.width).toBe(320);
      expect(button?.height).toBe(48);
      expect((await footer.boundingBox())?.height).toBeCloseTo(140, 0);
    }

    for (const [sectionName, section] of [
      ["security", security],
      ["cta", cta],
      ["footer", footer],
    ] as const) {
      await section.evaluate((element) =>
        element.scrollIntoView({ block: "center" }),
      );
      await section.screenshot({
        path: test.info().outputPath(`${sectionName}-${name}-light.png`),
      });
    }

    const registration = cta.getByRole("link");
    await expect(registration).toHaveAttribute("target", "_blank");
    await expect(registration).toHaveAttribute("rel", "noopener noreferrer");
    const popupPromise = page.waitForEvent("popup");
    await registration.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(/\/register$/);
    expect(await popup.evaluate(() => window.opener === null)).toBe(true);
    await popup.close();

    const lightBackground = await cta.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    );
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await expect(cta).not.toHaveCSS("background-color", lightBackground);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    for (const [sectionName, section] of [
      ["security", security],
      ["cta", cta],
      ["footer", footer],
    ] as const) {
      await section.evaluate((element) =>
        element.scrollIntoView({ block: "center" }),
      );
      await section.screenshot({
        path: test.info().outputPath(`${sectionName}-${name}-dark.png`),
      });
    }
  });
}
