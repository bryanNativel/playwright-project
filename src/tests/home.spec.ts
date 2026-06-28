import test, { expect } from "@playwright/test";
import { home } from "../page/home.page";

test("Change language", async ({ page }) => {
  const homePage = new home(page);
  await homePage.gotoHome();
  await homePage.changeLanguageInFrench();
  await expect(homePage.checkIfLanguageWasChanged(), {
    message: "Error : language was not changed",
  }).toBeVisible();
});
