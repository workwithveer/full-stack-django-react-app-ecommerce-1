import { test, expect } from "@playwright/test";

const homePageUrl = "http://localhost:3000";

test.describe("Home Page", () => {
  // test home page has heading "Welcome to Our E-Commerce Store"
  test("home page has heading 'Welcome to Our E-Commerce Store'", async ({
    page,
  }) => {
    await page.goto(homePageUrl);
    await expect(
      page.getByRole("heading", { name: "Welcome to Our E-Commerce Store" }),
    ).toBeVisible();
  });

  // test home page has buttons browse products, shopping cart, promotions, user profile
  test("home page has buttons browse products, shopping cart, promotions, user profile", async ({
    page,
  }) => {
    await page.goto(homePageUrl);
    await expect(
      page.getByRole("button", { name: "Browse Products" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Shopping Cart" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Promotions" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "User Profile" }),
    ).toBeVisible();
  });
});
