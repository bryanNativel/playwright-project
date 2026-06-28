import { expect, Locator, Page } from "@playwright/test";

export class contact {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly subject: Locator;
  readonly message: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByLabel("First name");
    this.lastName = page.getByLabel("Last name");
    this.email = page.getByLabel("Email address");
    this.subject = page.getByRole("combobox", { name: "subject" });
    this.message = page.getByLabel("Message");
    this.submitButton = page.getByRole("button", { name: /send/i });
  }

  public async fillOutTheContact(data: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  }) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.subject.click();
    await this.subject.selectOption({ label: "Webmaster" });
    await this.message.fill(data.message);
  }

  public async gotoContact() {
    await this.page.goto("https://practicesoftwaretesting.com/contact");
    await expect(
      this.page.waitForURL("https://practicesoftwaretesting.com/contact"),
      { message: "contact page not found" },
    );
  }
  public async submit() {
    await this.submitButton.click();
  }
}
