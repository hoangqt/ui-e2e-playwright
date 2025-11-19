export class LoginPage {
  constructor(private page: any) {}

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  async login(username: string, password: string) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
  }

  async logout() {
    await this.page.getByText('Logout', { exact: true }).click();
  }

  async isSuccessMessageVisible() {
    await this.page.waitForSelector('.flash.success', { state: 'visible', timeout: 5000 });
    return true;
  }
}
