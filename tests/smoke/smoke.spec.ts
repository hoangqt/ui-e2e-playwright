import { test, expect } from "@playwright/test";
import { Login } from "../../pages/Login";
import { Products } from "../../pages/Products";
import { Cart } from "../../pages/Cart";
import { Checkout } from "../../pages/Checkout";
import { testUsers } from "../../data/users";
import { AxeBuilder } from "@axe-core/playwright";
import { testProducts } from "../../data/products";

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

  test("should add product to cart and checkout", async ({ page }) => {
    const products = new Products(page);
    expect(await products.isProductsPageVisible()).toBe(true);

    await products.addProductToCart(testProducts.backpack);
    // Verify cart badge count is displayed
    const cartCount = await products.getCartBadgeCount();
    expect(cartCount).toBe(1);
  });

  test("should remove product from cart", async ({ page }) => {
    const productName = testProducts.backpack;
    const products = new Products(page);
    expect(await products.isProductsPageVisible()).toBe(true);

    await products.addProductToCart(productName);
    // Verify product was added to cart
    expect(await products.getCartBadgeCount()).toBe(1);

    await products.navigateToCart();

    const cart = new Cart(page);
    await cart.removeProductFromCart(productName);

    // Verify the product is no longer visible on the cart page
    expect(await cart.isProductVisible(productName)).toBe(false);
    // Verify cart badge is cleared
    expect(await products.getCartBadgeCount()).toBe(0);
  });

  test("should checkout and cancel", async ({ page }) => {
    const products = new Products(page);
    expect(await products.isProductsPageVisible()).toBe(true);

    await products.addProductToCart(testProducts.bikeLight);
    await products.navigateToCart();
    const cart = new Cart(page);
    const checkout = new Checkout(page);

    await cart.checkout();
    // Verify checkout page is displayed
    expect(await checkout.isCheckoutInformationPageVisible()).toBe(true);

    await checkout.cancel();

    // Verify the user is back on the Your Cart page
    expect(await cart.isCartPageVisible()).toBe(true);
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
