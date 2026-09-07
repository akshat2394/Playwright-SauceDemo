import { Locator, Page } from "@playwright/test";

interface Locators {
    locatorByTestId: (testId: string) => Locator;
    menuButton: Locator;
    logoutLink: Locator;
}

export class HomePage {
    constructor(readonly page: Page) {
    }

    public locator(): Locators {
        return {
            locatorByTestId: (testId: string) => {
                return this.page.getByTestId(`${testId}`)
            },
            menuButton: this.page.getByRole('button', { name: 'Open Menu' }),
            logoutLink: this.page.getByRole('link', { name: 'Logout' })
        }
    };

    public async addProductToCart(dataTestId: string) {
        await this.locator().locatorByTestId(dataTestId).click();
    }

    public async navigatesToCartPage(dataTestId: string) {
        await this.locator().locatorByTestId(dataTestId).click();
    }

    public async clickOnMenuButton() {
        await this.locator().menuButton.click();
    }

    async clickOnLogout() {
        await this.locator().logoutLink.click();
    }

}