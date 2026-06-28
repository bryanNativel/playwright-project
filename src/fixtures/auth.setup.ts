import { test as setup, expect } from "@playwright/test";
import path from "path";
const authFile = path.resolve("src/fixtures/user.json");
setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://practicesoftwaretesting.com/auth/login");
  await page
    .getByLabel("Email address *")
    .fill("customer@practicesoftwaretesting.com");
  await page.getByLabel("Password *").fill("welcome01");
  await page.getByRole("button", { name: "Login" }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL("https://practicesoftwaretesting.com/account");
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByText("Jane Doe")).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
