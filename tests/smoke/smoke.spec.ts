import { test, expect } from "@playwright/test";
import { Login } from "../../pages/Login";
import { Products } from "../../pages/Products";
import { Cart } from "../../pages/Cart";
import { Checkout } from "../../pages/Checkout";
import { CheckoutOverview } from "../../pages/CheckoutOverview";
import { CheckoutComplete } from "../../pages/CheckoutComplete";
import { testUsers } from "../../data/users";
import { AxeBuilder } from "@axe-core/playwright";
import { testProducts } from "../../data/products";
import { generateUser, generateAddress } from "../../data/syntheticData";

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

  test("should add product and remove", async ({ page }) => {
    const products = new Products(page);
    expect(await products.isProductsPageVisible()).toBe(true);

    await products.addProduct(testProducts.backpack);
    expect(await products.getCartBadgeCount()).toBe(1);

    await products.removeProduct(testProducts.backpack);
    expect(await products.getCartBadgeCount()).toBe(0);
  });

  test("should remove product from cart", async ({ page }) => {
    const productName = testProducts.fleece;
    const products = new Products(page);
    expect(await products.isProductsPageVisible()).toBe(true);

    await products.addProduct(productName);
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

    await products.addProduct(testProducts.bikeLight);

    await products.navigateToCart();
    const cart = new Cart(page);

    const checkout = new Checkout(page);
    await cart.checkout();

    expect(await checkout.isCheckoutInformationPageVisible()).toBe(true);

    await checkout.cancel();

    expect(await cart.isCartPageVisible()).toBe(true);
  });

  test("should checkout and pay", async ({ page }) => {
    const products = new Products(page);
    expect(await products.isProductsPageVisible()).toBe(true);

    await products.addProduct(testProducts.backpack);

    await products.navigateToCart();
    const cart = new Cart(page);

    const checkout = new Checkout(page);
    await cart.checkout();

    expect(await checkout.isCheckoutInformationPageVisible()).toBe(true);

    const fakeUser = generateUser();
    const fakeAddress = generateAddress();

    await checkout.setFirstName(fakeUser.firstName);
    await checkout.setLastName(fakeUser.lastName);
    await checkout.setPostalCode(fakeAddress.postalCode);

    await checkout.continue();

    const checkoutOverview = new CheckoutOverview(page);
    expect(await checkoutOverview.isCheckoutOverviewPageVisible()).toBe(true);
    await checkoutOverview.finish();

    const checkoutComplete = new CheckoutComplete(page);
    expect(await checkoutComplete.isCheckoutCompletePageVisible()).toBe(true);
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
