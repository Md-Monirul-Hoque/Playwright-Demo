import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/saucedemo/loginPage';
import { InventoryPage } from '../../../pages/saucedemo/inventoryPage';

test.describe('SauceDemo - Login', () => {

  test('should login successfully with standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.SAUCE_STANDARD_USER!,
      process.env.SAUCE_PASSWORD!
    );

    await inventoryPage.expectLoaded();
    await inventoryPage.expectProductsVisible();
  });

  test('should fail login for locked user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.SAUCE_LOCKED_USER!,
      process.env.SAUCE_PASSWORD!
    );

    await loginPage.expectLoginError();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');

    await loginPage.expectLoginError();
  });

  test('should show error when username is missing', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', process.env.SAUCE_PASSWORD!);

    await loginPage.expectLoginError();
  });

  test('should show error when password is missing', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.SAUCE_STANDARD_USER!, '');

    await loginPage.expectLoginError();
  });

});