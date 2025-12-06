import { Page } from "@playwright/test";

export class CheckoutOverview {
  constructor(private page: Page) {}

  async isCheckoutOverviewPageVisible(): Promise<boolean> {
    const checkoutTitle = this.page
      .locator('[data-test="title"]')
      .filter({ hasText: "Checkout: Overview" });
    try {
      await checkoutTitle.waitFor({ state: "visible", timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async finish() {
    await this.page.getByText("Finish", { exact: true }).click();
  }
}
