import { Locator, Page } from "@playwright/test";

interface Locators {
    credFields: (placeHolder: string) => Locator;
    loginButton: Locator;
}

export class LoginPage {

    constructor(readonly page: Page) {
    }

    public locator(): Locators {
        return {
            credFields: (placeHolder: string) => {
                return this.page.getByPlaceholder(`${placeHolder}`);
            },
            loginButton: this.page.getByRole('button', { 'name': 'login' })
        }
    }

    public async enterUserName(userName: string) {
        await this.locator().credFields('Username').fill(userName);
        return this;
    }

    public async enterPassword(password: string) {
        await this.locator().credFields('Password').fill(password);
        return this;
    }

    public async clickOnLoginButton() {
        await this.locator().loginButton.click();
        return this;
    }
}
