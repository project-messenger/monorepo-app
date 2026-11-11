import { expect, test } from "@playwright/test";

// Проверка, что e2e-окружение собрано: страницы открываются.
test("открываются главная и вход", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Acme/);

  await page.goto("/login");
  await expect(
    page.getByRole("heading", { name: "Вход в аккаунт" }),
  ).toBeVisible();
});
