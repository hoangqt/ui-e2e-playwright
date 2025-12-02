import { Page } from "@playwright/test";

export class Cart {
  constructor(private page: Page) {}

  async removeProductFromCart(productName: string) {
    await this.page
      .locator(".cart_item")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Remove" })
      .click();
  }

  async checkout() {
    await this.page.getByText("Checkout", { exact: true }).click();
  }

  async continueShopping() {
    await this.page.getByText("Continue Shopping", { exact: true }).click();
  }

  async isProductVisible(productName: string): Promise<boolean> {
    const product = this.page
      .locator(".cart_item")
      .filter({ hasText: productName });
    try {
      await product.waitFor({ state: "visible", timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async isCartPageVisible(): Promise<boolean> {
    const cartTitle = this.page
      .locator('[data-test="title"]')
      .filter({ hasText: "Your Cart" });
    try {
      await cartTitle.waitFor({ state: "visible", timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }
}
