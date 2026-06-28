import { expect, Locator, Page } from "@playwright/test";

export class home {
  readonly page: Page;
  readonly searchQuery: Locator;
  readonly searchSubmit: Locator;
  readonly navMenu: Locator;
  readonly navMyFavorites: Locator;
  readonly navLanguage: Locator;
  readonly frLanguage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchQuery = page.getByPlaceholder("Search");
    this.searchSubmit = page.getByRole("button", { name: "Search" });
    this.navMenu = page.locator('[data-test="nav-menu"]');
    this.navMyFavorites = page.locator('[data-test="nav-my-favorites"]');
    this.navLanguage = page.locator('[data-test="language-select"]');
  }

  public async gotoHome() {
    await this.page.goto("https://practicesoftwaretesting.com");
    await expect(this.page.waitForURL("https://practicesoftwaretesting.com"), {
      message: "contact page not found",
    });
  }

  public async searchProduct(query: string) {
    await this.searchQuery.fill(query);
    await this.searchSubmit.click();
  }

  public async openProduct(query: string) {
    await this.page
      .locator(".card")
      .filter({ hasText: query })
      .waitFor({ state: "visible", timeout: 12000 });
    await this.page.locator(".card").filter({ hasText: query }).click();
  }

  public async searchAndOpenProduct(query: string) {
    await this.searchProduct(query);
    await this.openProduct(query);
  }

  public productCard(productName: string): Locator {
    return this.page.locator("div").filter({ hasText: productName }).nth(3);
  }
  public changeLanguageInFrench() {
    this.navLanguage.click();
    this.page.locator('[data-test="lang-fr"]').click();
  }

  public checkIfLanguageWasChanged(): Locator {
    return this.page.getByText("Accueil");
  }
}
