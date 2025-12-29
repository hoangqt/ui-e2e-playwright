import { Page } from "@playwright/test";

export class Login {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.page.getByTestId("username").fill(username);
    await this.page.getByTestId("password").fill(password);
    await this.page.getByTestId("login-button").click();
  }

  async logout() {
    await this.page.getByText("Logout", { exact: true }).click();
  }

  async isSuccessMessageVisible() {
    const cartLink = this.page.getByTestId("shopping-cart-link");
    await cartLink.waitFor({ state: "visible", timeout: 5000 });
    return true;
  }
}
