import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("selection/test");
});

test("initially selected values should be reflected in the UI for multiselect models", async ({
  page,
}) => {
  const container = page.getByTestId(
    "multi select column mode initial selections test container",
  );

  const secondRow = container.locator('tbody > tr[aria-rowindex="3"]');
  const thirdRow = container.locator('tbody > tr[aria-rowindex="4"]');

  await expect(secondRow).toHaveAttribute("aria-selected", "true");
  await expect(thirdRow).toHaveAttribute("aria-selected", "true");
});

test("for grids of multi select type and column mode with existing columns selected, clicking the select column header cell will deselect all rows", async ({
  page,
}) => {
  const container = page.getByTestId(
    "multi select column mode initial selections test container",
  );

  const selectHeaderCell = container.locator(
    'thead > tr > th[aria-colindex="1"]',
  );
  await selectHeaderCell.click();

  for (let i = 0; i < 4; i++) {
    const row = container.locator(`tbody > tr[aria-rowindex="${i + 2}"]`);
    await expect(row).toHaveAttribute("aria-selected", "false");
  }
});

test("for grids of multi select type and column mode with no existing columns selected, clicking the select column header cell will select all rows", async ({
  page,
}) => {
  const container = page.getByTestId(
    "multi select column mode no initial selections test container",
  );

  const selectHeaderCell = container.locator(
    'thead > tr > th[aria-colindex="1"]',
  );
  await selectHeaderCell.click();

  for (let i = 0; i < 4; i++) {
    const row = container.locator(`tbody > tr[aria-rowindex="${i + 2}"]`);
    await expect(row).toHaveAttribute("aria-selected", "true");
  }
});

test("for grids of multi select type and column mode, clicking on the selection checkbox for an unselected row will select that row", async ({
  page,
}) => {
  const container = page.getByTestId(
    "multi select column mode no initial selections test container",
  );

  const row = container.locator(`tbody > tr[aria-rowindex="6"]`);
  const checkbox = row.getByRole("checkbox");
  await checkbox.check();

  const modifiedRow = container.locator(
    `tbody > tr[aria-rowindex="6"][aria-selected="true"]`,
  );
  await expect(modifiedRow).toBeVisible();
});

test("for grids of multi select type and column mode, clicking on the selection checkbox for a selected row will deselect that row", async ({
  page,
}) => {
  const container = page.getByTestId(
    "multi select column mode initial selections test container",
  );

  const row = container.locator(
    `tbody > tr[aria-rowindex="3"][aria-selected="true"]`,
  );
  const checkbox = row.getByRole("checkbox");
  await checkbox.uncheck();

  const modifiedRow = container.locator(
    `tbody > tr[aria-rowindex="3"][aria-selected="false"]`,
  );
  await expect(modifiedRow).toBeVisible();
});

test("for grids of multi select type and row mode, clicking on an unselected row selects that row", async ({
  page,
}) => {
  const container = page.getByTestId(
    "multi select row mode no initial selections test container",
  );

  const row = container.locator(
    `tbody > tr[aria-rowindex="5"][aria-selected="false"]`,
  );
  const cell = row.locator('td[aria-colindex="2"]');
  await cell.click();

  const modifiedRow = container.locator(
    `tbody > tr[aria-rowindex="5"][aria-selected="true"]`,
  );
  await expect(modifiedRow).toBeVisible();
});

test("for grids of multi select type and row mode, clicking on a selected row deselects that row", async ({
  page,
}) => {
  const container = page.getByTestId(
    "multi select row mode initial selections test container",
  );

  const row = container.locator(
    `tbody > tr[aria-rowindex="3"][aria-selected="true"]`,
  );
  const cell = row.locator('td[aria-colindex="2"]');
  await cell.click();

  const modifiedRow = container.locator(
    `tbody > tr[aria-rowindex="3"][aria-selected="false"]`,
  );
  await expect(modifiedRow).toBeVisible();
});
