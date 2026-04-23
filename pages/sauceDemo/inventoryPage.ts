import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;

  // Locators
  private readonly title: Locator;
  private readonly inventoryItems: Locator;
  private readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  // -------------------------------
  // Assertions
  // -------------------------------

  async expectLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  async expectProductsVisible() {
    const count = await this.inventoryItems.count();
    expect(count).toBeGreaterThan(0);
  }

  // -------------------------------
  // Actions
  // -------------------------------

  async addProductToCart(productName: string) {
    const product = this.page.locator('.inventory_item', {
      hasText: productName,
    });

    await product.locator('button').click();
  }

  async removeProductFromCart(productName: string) {
    const product = this.page.locator('.inventory_item', {
      hasText: productName,
    });

    await product.locator('button').click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  // -------------------------------
  // Utilities
  // -------------------------------

  async getProductCount(): Promise<number> {
    return await this.inventoryItems.count();
  }
}