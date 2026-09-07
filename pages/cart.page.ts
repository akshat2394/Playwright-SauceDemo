import { Locator, Page } from "@playwright/test";

interface Locators {
    locatorByTestId: (testId: string) => Locator;
    checkoutButton : Locator;
}

export class CartPage {
    constructor(readonly page: Page){}

    public locator() : Locators {
        return {
            locatorByTestId: (testId: string) => {
                return this.page.getByTestId(testId);
            },
            checkoutButton: this.page.getByRole('button', {name: 'Checkout'})
        }
    }

    async isAddedProductVisible(expectedProductName: string): Promise<Locator> {
        return this.locator().locatorByTestId('inventory-item-name').filter({'hasText': `${expectedProductName}`});
    }

    async clickOnCheckoutButton() {
        await this.locator().checkoutButton.click();
    }
}