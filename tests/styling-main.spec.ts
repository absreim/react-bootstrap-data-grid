import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("styling/test/main");
})

test("single element styles work", async ({ page }) => {
  const topLevelDiv = page.getByTestId("rbdg-top-level-div");
  const tableAndPaginationDiv = page.getByTestId("rbdg-table-and-pagination-div");
  const table = page.getByRole("table");
  const tbody = page.locator("tbody");
  const thead = page.locator("thead");
  const theadTr = thead.getByRole("row");
  const caption = page.getByRole("caption");
  const editColTh = page.getByRole("columnheader", { name: "Edit Controls"})

  await expect(topLevelDiv).toHaveClass("top-level-div-test-class");
  await expect(tableAndPaginationDiv).toHaveClass(
    "table-and-pagination-div-test-class",
  );
  await expect(table).toContainClass("main-table-test-class table");
  await expect(tbody).toHaveClass("main-table-body-test-class");
  await expect(thead).toHaveClass("main-table-thead-test-class");
  await expect(theadTr).toHaveClass("main-table-thead-tr-test-class");
  await expect(caption).toHaveClass("main-table-caption-test-class");
  await expect(editColTh).toHaveClass("main-table-edit-col-th-test-class");
});
