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
    await this.page.getByTestId("firstName").fill(firstName);
  }

  async setLastName(lastName: string) {
    await this.page.getByTestId("lastName").fill(lastName);
  }

  async setPostalCode(postalCode: string) {
    await this.page.getByTestId("postalCode").fill(postalCode);
  }

  async isCheckoutInformationPageVisible(): Promise<boolean> {
    const checkoutTitle = this.page
      .getByTestId("title")
      .filter({ hasText: "Checkout: Your Information" });
    try {
      await checkoutTitle.waitFor({ state: "visible", timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }
}
