import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("should log in using Page Object", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("tomsmith", "SuperSecretPassword!");
  expect(await loginPage.isSuccessMessageVisible()).toBe(true);

  await loginPage.logout();
});
