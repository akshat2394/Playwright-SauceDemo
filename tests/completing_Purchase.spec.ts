import { test, expect } from '../utilities/base-Config'

test('Completing a Purchase', async ({ page, loginPage, homePage, cartPage, checkoutPage }) => {

    await test.step('Launch and Login Into application', async () => {
        await page.goto("https://www.saucedemo.com", { waitUntil: 'domcontentloaded' });
        await (await (await loginPage.enterUserName('standard_user'))
            .enterPassword('secret_sauce'))
            .clickOnLoginButton();
    });

    await test.step('Verify user Logged in Successfully', async () => {
        await expect(homePage.locator().locatorByTestId('title')).toContainText('Products');
    });

    await test.step('User add multiple prodcts to cart', async () => {
        await homePage.addProductToCart('add-to-cart-sauce-labs-bolt-t-shirt');
        await homePage.addProductToCart('add-to-cart-test.allthethings()-t-shirt-(red)');
        await homePage.navigatesToCartPage('shopping-cart-link');
    });

    await test.step('User navigates and validated correct products are added in cart', async () => {
        await homePage.navigatesToCartPage('shopping-cart-link');
        await expect(cartPage.locator().locatorByTestId('title')).toContainText('Cart');
        expect(await cartPage.isAddedProductVisible('Test.allTheThings() T-Shirt (Red)')).toBeTruthy();
        expect(await cartPage.isAddedProductVisible('Sauce Labs Bolt T-Shirt')).toBeTruthy();
    })

    await test.step('User navigates to checkout page and fill user details', async () => {
        await cartPage.clickOnCheckoutButton();
        await expect(checkoutPage.locator().locatorByTestId('title')).toContainText('Checkout');
        await checkoutPage.fillCheckoutDetails('Test', 'Automation', 12345);
        await checkoutPage.clickOnContinueButton();
    });

    await test.step('User click on Finish button and validate the order confirmation', async () => {
        await expect(checkoutPage.locator().locatorByTestId('title')).toContainText('Checkout: Overview');
        await checkoutPage.clickOnFininshButton();
        await expect(checkoutPage.locator().locatorByTestId('title')).toHaveText('Checkout: Complete!');
        await expect(checkoutPage.locator().locatorByTestId('complete-header')).toHaveText('Thank you for your order!');
    });

    await test.step('User logout', async () => {
        await homePage.clickOnMenuButton();
        await homePage.clickOnLogout();
        await expect(loginPage.locator().loginButton).toBeVisible();
    });
})
