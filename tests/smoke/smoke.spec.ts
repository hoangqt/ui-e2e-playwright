import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { testUsers } from "../../data/users";

test.describe("Smoke testing", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      testUsers.standardUser.username,
      testUsers.standardUser.password,
    );
    expect(await loginPage.isSuccessMessageVisible()).toBe(true);
  });

  test("should log in successfully", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    expect(await productsPage.isProductsPageVisible()).toBe(true);
  });

  test("should add product to cart and checkout", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    expect(await productsPage.isProductsPageVisible()).toBe(true);

    await productsPage.addProductToCart("Sauce Labs Backpack");
    await productsPage.cart();
    await productsPage.checkout();
  });
});
