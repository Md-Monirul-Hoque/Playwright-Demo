import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Actions

  async goto() {
    await this.page.goto(process.env.SAUCE_DEMO_URL!);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAsStandardUser() {
    await this.login(
      process.env.SAUCE_STANDARD_USER!,
      process.env.SAUCE_PASSWORD!
    );
  }

  async loginAsLockedUser() {
    await this.login(
      process.env.SAUCE_LOCKED_USER!,
      process.env.SAUCE_PASSWORD!
    );
  }

  // Assertions

  async expectLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }
}