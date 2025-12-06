import { Page } from "@playwright/test";

export class CheckoutComplete {
  constructor(private page: Page) {}

  async isCheckoutCompletePageVisible(): Promise<boolean> {
    const checkoutTitle = this.page
      .locator('[data-test="title"]')
      .filter({ hasText: "Checkout: Complete!" });
    try {
      await checkoutTitle.waitFor({ state: "visible", timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async backHome() {
    await this.page.getByText("Back Home", { exact: true }).click();
  }
}
