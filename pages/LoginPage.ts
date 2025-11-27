export class LoginPage {
  constructor(private page: any) { }

  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async logout() {
    await this.page.getByText('Logout', { exact: true }).click();
  }

  async isSuccessMessageVisible() {
    // Wait for the shopping cart link to be visible
    await this.page.waitForSelector('[data-test="shopping-cart-link"]', { state: 'visible', timeout: 5000 });
    return true;
  }
}
