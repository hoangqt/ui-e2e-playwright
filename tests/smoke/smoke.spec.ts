import { test, expect } from "@playwright/test";
import { Login } from "../../pages/Login";
import { Products } from "../../pages/Products";
import { testUsers } from "../../data/users";
import { AxeBuilder } from "@axe-core/playwright";

test.describe("Smoke testing", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.goto();
    await loginPage.login(
      testUsers.standardUser.username,
      testUsers.standardUser.password,
    );
    expect(await loginPage.isSuccessMessageVisible()).toBe(true);
  });

  test("should log in successfully", async ({ page }) => {
    const productsPage = new Products(page);
    expect(await productsPage.isProductsPageVisible()).toBe(true);
  });

  test("should add product to cart and checkout", async ({ page }) => {
    const productsPage = new Products(page);
    await productsPage.goto();
    expect(await productsPage.isProductsPageVisible()).toBe(true);

    await productsPage.addProductToCart("Sauce Labs Backpack");
    await productsPage.cart();
    await productsPage.checkout();
    await productsPage.cancel();
    await productsPage.continueShopping();
  });

  test("should remove product from cart", async ({ page }) => {
    const productName = "Sauce Labs Bike Light";
    const productsPage = new Products(page);
    await productsPage.goto();
    expect(await productsPage.isProductsPageVisible()).toBe(true);

    await productsPage.addProductToCart(productName);
    await productsPage.cart();
    await productsPage.removeProductFromCart(productName);

    // Verify the product is no longer visible on the cart page
    await expect(page.getByText(productName)).not.toBeVisible();
  });

  test("should have accessibility violations", async ({ page }) => {
    // Check against wcag2a and wcag21aa rules
    const accessibilityResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag21aa"])
      .analyze();
    // This page is not WCAG compliant so expect violations to be greater than 0
    expect(accessibilityResults.violations.length).toBeGreaterThan(0);
  });
});
