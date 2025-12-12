import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("test");
})

test('grid displays correct column headings', async ({ page }) => {
  const workingGridContainer = page.getByTestId("functioning grid container");
  const columns = await workingGridContainer.getByRole("columnheader").all();

  await expect(columns[0]).toHaveText("String Column");
  await expect(columns[1]).toHaveText("Number Column");
  await expect(columns[2]).toHaveText("Date Column");
  await expect(columns[3]).toHaveText("Datetime Column");
})

test("displays values correctly with or without formatters", async ({ page }) => {
  const workingGridContainer = page.getByTestId("functioning grid container");
  const rows = await workingGridContainer.getByRole("row").all();
  const firstDataRow = rows[1];
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
