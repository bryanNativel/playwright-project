import test, { expect } from "@playwright/test";
import { contact } from "../page/contact.page";

test.beforeEach(async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/contact");
});
test("send message successfully", async ({ page }) => {
  const contactPage = new contact(page);
  await contactPage.gotoContact();
  await contactPage.fillOutTheContact({
    firstName: "jean",
    lastName: "dupon",
    email: "email@email.fr",
    message: "messsage:  bip bop bip bip bop, we are alive, help please !!!",
  });
  await contactPage.submit();
  await expect(
    page.getByText("Thanks for your message! We will contact you shortly."),
  ).toBeVisible();
});

test("send message unsuccessfully because of missing fields", async ({
  page,
}) => {
  const contactPage = new contact(page);
  await contactPage.gotoContact();
  await contactPage.fillOutTheContact({
    firstName: "louis",
    lastName: "dupon",
    email: "isNotAemail",
    message: "messsage:  bip bop bip bip bop, we are alive, help please !!!",
  });

  await contactPage.submit();

  await expect(page.getByText("Email format is invalid")).toBeVisible();
  await expect(
    page.getByText("Thanks for your message! We will contact you shortly."),
    { message: "Message not sent successfully" },
  ).not.toBeVisible();
});
