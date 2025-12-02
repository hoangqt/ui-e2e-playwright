import { Page } from "@playwright/test";

export class Products {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async isProductsPageVisible(): Promise<boolean> {
    const title = this.page.locator('[data-test="title"]');
    try {
      await title.waitFor({ state: "visible", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async addProductToCart(productName: string) {
    await this.page
      .locator(".inventory_item")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add to cart" })
      .click();
  }

  async navigateToCart() {
    await this.page.click('[data-test="shopping-cart-link"]');
  }

  async getCartBadgeCount(): Promise<number> {
    try {
      const badge = this.page.locator('[data-test="shopping-cart-badge"]');
      await badge.waitFor({ state: "visible", timeout: 5000 });
      const count = await badge.textContent();
      return count ? parseInt(count, 10) : 0;
    } catch {
      return 0; // Badge not visible means 0 items
    }
  }
}
