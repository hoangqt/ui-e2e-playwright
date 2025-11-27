export class ProductsPage {
    constructor(private page: any) { }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async isProductsPageVisible() {
        await this.page.waitForSelector('[data-test="title"]', { state: 'visible', timeout: 5000 });
        return true;
    }

    async addProductToCart(productName: string) {
        await this.page.getByText(productName).click();
    }

    async removeProductFromCart(productName: string) {
        await this.page.getByText(productName).click();
    }

    async cart() {
        await this.page.click('[data-test="shopping-cart-link"]');
    }

    async checkout() {
        await this.page.getByText('Checkout', { exact: true }).click();
    }
}