import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("test");
})

test('grid displays correct column headings', async ({ page }) => {
  const workingGridContainer = page.getByTestId("functioning grid container");
  // TODO: it appears that there is no way to have Playwright retry assertions on arrays of locators.
  // Find some way to locate columns, rows, and cells directly. May require modifying the grid's code.
  const allColumnsLocator = await workingGridContainer.getByRole("columnheader").all();
  expect(allColumnsLocator).toHaveLength(4);
  const allColumns = allColumnsLocator;

  await expect(allColumns[0]).toHaveText("String Column");
  await expect(allColumns[1]).toHaveText("Number Column");
  await expect(allColumns[2]).toHaveText("Date Column");
  await expect(allColumns[3]).toHaveText("Datetime Column");
})

test("displays values correctly with or without formatters", async ({ page }) => {
  const workingGridContainer = page.getByTestId("functioning grid container");
  const rows = await workingGridContainer.getByRole("row");
  const allRows = await rows.all();
  const firstDataRow = allRows[1];
  const cells = await firstDataRow.getByRole("cell").all();

  await expect(cells[0]).toHaveText("first row string");
  await expect(cells[1]).toHaveText("1");
  await expect(cells[2]).toHaveText("(A date)");
  await expect(cells[3]).toHaveText("(A datetime)");
});

test("displays rows in the correct order", async ({ page }) => {
  const workingGridContainer = page.getByTestId("functioning grid container");
  const rows = await workingGridContainer.getByRole("row").all();
  const thirdDataRow = rows[3];
  const thirdDataRowCells = await thirdDataRow.getByRole("cell").all();
  const lastDataRow = rows[5];
  const lastDataRowCells = await lastDataRow.getByRole("cell").all();

  await expect(thirdDataRowCells[0]).toHaveText("third row string");
  await expect(lastDataRowCells[1]).toHaveText("5");
})

test("throws an error when encountering an extra column", async ({ page }) => {
  const extraFieldContainer = page.getByTestId(
    "extra field grid container",
  );
  const p = await extraFieldContainer.getByRole("paragraph");

  await expect(p).toHaveText(
    "As expected, an error occurred when rendering extra field test case",
  );
});

test("throws an error when encountering a missing column", async ({ page }) => {
  const missingFieldContainer = page.getByTestId(
    "missing field grid container",
  );
  const p = await missingFieldContainer.getByRole("paragraph");

  await expect(p).toHaveText(
    "As expected, an error occurred when rendering missing field test case",
  );
})
