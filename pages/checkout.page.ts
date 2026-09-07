import { Locator, Page } from "@playwright/test";

interface Locators {
    locatorByTestId: (testId: string) => Locator,
    continueButton: Locator,
    finishButton: Locator
}

export class CheckoutPage {
    constructor(readonly page: Page) { }

    public locator(): Locators {
        return {
            locatorByTestId: (testId: string) => {
                return this.page.getByTestId(testId);
            },
            continueButton: this.page.getByRole('button', { name: 'Continue' }),
            finishButton: this.page.getByRole('button', { name: 'Finish' })
        }
    }

    async fillCheckoutDetails(firstName: string, lastName: string, postalCode: number) {
        await this.locator().locatorByTestId('firstName').fill(firstName);
        await this.locator().locatorByTestId('lastName').fill(lastName);
        await this.locator().locatorByTestId('postalCode').fill(postalCode.toString());
    }

    async clickOnContinueButton() {
        await this.locator().continueButton.click();
    }

    async clickOnFininshButton() {
        await this.locator().finishButton.click();
    }
}
