export class Products {
  constructor(private page: any) {}

  async goto() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async isProductsPageVisible() {
    await this.page.waitForSelector('[data-test="title"]', {
      state: "visible",
      timeout: 5000,
    });
    return true;
  }

  async addProductToCart(productName: string) {
    await this.page
      .locator(".inventory_item")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add to cart" })
      .click();
  }

  async removeProductFromCart(productName: string) {
    await this.page
      .locator(".cart_item")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Remove" })
      .click();
  }

  async cart() {
    await this.page.click('[data-test="shopping-cart-link"]');
  }

  async cartContinueShopping() {
    await this.page.click('[data-test="continue-shopping"]');
  }

  async cartCheckout() {
    await this.page.click('[data-test="checkout"]');
  }

  async checkout() {
    await this.page.getByText("Checkout", { exact: true }).click();
  }

  async cancel() {
    await this.page.getByText("Cancel", { exact: true }).click();
  }

  async continueShopping() {
    await this.page.getByText("Continue Shopping", { exact: true }).click();
  }
}
