import { Page } from "@playwright/test";

export class Checkout {
  constructor(private page: Page) {}

  async cancel() {
    await this.page.getByText("Cancel", { exact: true }).click();
  }

  async continue() {
    await this.page.getByText("Continue", { exact: true }).click();
  }

  async setFirstName(firstName: string) {
    await this.page.locator("#first-name").fill(firstName);
  }

  async setLastName(lastName: string) {
    await this.page.locator("#last-name").fill(lastName);
  }

  async setPostalCode(postalCode: string) {
    await this.page.locator("#postal-code").fill(postalCode);
  }

  async isCheckoutInformationPageVisible(): Promise<boolean> {
    const checkoutTitle = this.page
      .locator('[data-test="title"]')
      .filter({ hasText: "Checkout: Your Information" });
    try {
      await checkoutTitle.waitFor({ state: "visible", timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }
}
