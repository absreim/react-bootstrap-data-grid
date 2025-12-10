import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("test");
})

test('grid displays correct column headings', async ({ page }) => {
  const workingGridContainer = page.getByTestId("functioning grid container");
  const theadLocator = workingGridContainer.getByRole("rowgroup");

  await expect(theadLocator.getByText("String Column")).toHaveAttribute("aria-colindex", "1");
  await expect(theadLocator.getByText("Number Column")).toHaveAttribute("aria-colindex", "2");
  await expect(theadLocator.getByText("Date Column")).toHaveAttribute("aria-colindex", "3");
  await expect(theadLocator.getByText("Datetime Column")).toHaveAttribute("aria-colindex", "4");
})

test("displays values correctly with or without formatters", async ({ page }) => {
  const workingGridContainer = page.getByTestId("functioning grid container");
  const firstRow = workingGridContainer.locator('tbody > tr[aria-rowindex="2"]');

  await expect(firstRow.getByText("first row string")).toHaveAttribute(
    "aria-colindex",
    "1",
  );
  await expect(firstRow.getByText("1")).toHaveAttribute("aria-colindex", "2");
  await expect(firstRow.getByText("(A date)")).toHaveAttribute(
    "aria-colindex",
    "3",
  );
  await expect(firstRow.getByText("(A datetime)")).toHaveAttribute(
    "aria-colindex",
    "4",
  );
});

test("displays rows in the correct order", async ({ page }) => {
  const workingGridContainer = page.getByTestId("functioning grid container");
  const thirdDataRow = workingGridContainer.locator(
    'tbody > tr[aria-rowindex="4"]',
  );
  const lastDataRow = workingGridContainer.locator(
    'tbody > tr[aria-rowindex="6"]',
  );

  await expect(thirdDataRow.getByText("third row string")).toHaveAttribute(
    "aria-colindex",
    "1",
  );
  await expect(lastDataRow.getByText("5")).toHaveAttribute(
    "aria-colindex",
    "2",
  );
})
