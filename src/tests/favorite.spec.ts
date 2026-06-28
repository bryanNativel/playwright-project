import test, { expect } from "@playwright/test";
import { favorite } from "../page/favorite.page";
import { home } from "../page/home.page";

test("Add a product to favorites page", async ({ page }) => {
  const favoritePage = new favorite(page);
  const homePage = new home(page);
  await homePage.gotoHome();
  await homePage.searchAndOpenProduct("Thor Hammer");
  await favoritePage.addToFavorites();
  await expect(favoritePage.addedToFavoritesMessage(), {
    message: "Error: The products were not added. Do they already exist?",
  }).toBeVisible();
});

test("Add the same product to favorites page", async ({ page }) => {
  const favoritePage = new favorite(page);
  const homePage = new home(page);
  await homePage.gotoHome();
  await homePage.searchAndOpenProduct("Thor Hammer");
  await favoritePage.addToFavorites();
  await expect(favoritePage.alreadyInFavoritesMessage(), {
    message: "Error:The products should not have been added",
  }).toBeVisible();
});

test("Delete product to favorites page", async ({ page }) => {
  const favoritePage = new favorite(page);
  const homePage = new home(page);
  await homePage.gotoHome();
  await favoritePage.gotoFavorites();
  await favoritePage.deleteProductFromFavorites("Thor Hammer");
  await expect(favoritePage.productCard("Thor Hammer")).not.toBeVisible();
});
