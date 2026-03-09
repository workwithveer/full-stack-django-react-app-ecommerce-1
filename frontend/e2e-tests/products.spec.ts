import { test, expect } from "@playwright/test";

const productsPageUrl = "http://localhost:3000/products";

test.describe("Products Page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Playwright homepage
    await page.goto(productsPageUrl);
  });
  test("products page has products in title", async ({ page }) => {
    // Fetch the title of the page
    const products = await page.locator("h1").first().textContent();

    // Assert that the products are visible
    expect(products).toContain("Products");
  });

  test("products page check all categories is selected and has the correct number of products", async ({
    page,
  }) => {
    await page.getByTestId("AllCategories").isVisible();
    await page
      .getByTestId("AllCategoriesCount")
      .textContent()
      .then((text) => {
        expect(text).toBe("34");
      });
  });

  test("Products page add to cart button", async ({ page }) => {
    await page.getByText("Add to Cart").first().click();
    await page.getByTestId("ShoppingCartIcon").first().click();

    await expect(page).toHaveURL(/\/cart/);
    await expect(
      page.getByRole("heading", { name: "Shopping Cart", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText("Cart Items (1)")).toBeVisible();
  });
});
