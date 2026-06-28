import { expect, Locator, Page } from "@playwright/test";

export class favorite {
  readonly page: Page;
  readonly searchQuery: Locator;
  readonly searchSubmit: Locator;
  readonly addToFavoritesButton: Locator;
  readonly navMenu: Locator;
  readonly navMyFavorites: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToFavoritesButton = page.getByRole("button", {
      name: " Add to favourites ",
    });
  }

  public async gotoFavorites() {
    await this.page.goto(
      "https://practicesoftwaretesting.com/account/favorites",
    );
    await expect(
      this.page.waitForURL(
        "https://practicesoftwaretesting.com/account/favorites",
      ),
      {
        message: "contact page not found",
      },
    );
  }

  public async addToFavorites() {
    await this.addToFavoritesButton.click();
  }

  public productCard(productName: string): Locator {
    return this.page.locator("div").filter({ hasText: productName }).nth(3);
  }

  public async deleteProductFromFavorites(productName: string) {
    const card = this.productCard(productName);
    await card.locator('[data-test="delete"]').click();
  }

  public alreadyInFavoritesMessage(): Locator {
    return this.page
      .locator("div")
      .filter({ hasText: "Product already in your" })
      .nth(2);
  }

  public addedToFavoritesMessage(): Locator {
    return this.page
      .locator("div")
      .filter({ hasText: "Product added to your" })
      .nth(2);
  }
}
