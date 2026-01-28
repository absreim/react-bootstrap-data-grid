import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("selection/test");
});

// Multi select type

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

test("for multi select grids, selection via both input and row clicking are possible", async ({
  page,
}) => {
  const container = page.getByTestId(
    "multi select both mode initial selections test container",
  );

  const row3 = container.locator(
    `tbody > tr[aria-rowindex="4"][aria-selected="true"]`,
  );
  const checkbox = row3.getByRole("checkbox");
  await checkbox.uncheck();

  const row1 = container.locator(
    `tbody > tr[aria-rowindex="2"][aria-selected="false"]`,
  );
  const cell = row1.locator('td[aria-colindex="2"]');
  await cell.click();

  const deselectedRow3 = container.locator(
    `tbody > tr[aria-rowindex="4"][aria-selected="false"]`,
  );
  const selectedRow1 = container.locator(
    `tbody > tr[aria-rowindex="2"][aria-selected="true"]`,
  );

  await expect(deselectedRow3).toBeVisible();
  await expect(selectedRow1).toBeVisible();
});

test("for multi select grids in both mode, the select all control should work", async ({
  page,
}) => {
  const container = page.getByTestId(
    "multi select both mode initial selections test container",
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

// Single select type

test("initially selected value should be reflected in the UI for single select models", async ({
  page,
}) => {
  const container = page.getByTestId(
    "single select column mode initial selections test container",
  );

  const secondRow = container.locator('tbody > tr[aria-rowindex="3"]');

  await expect(secondRow).toHaveAttribute("aria-selected", "true");
});

test("for single select grids in column mode, clicking the select column header cell will deselect an existing selection", async ({
  page,
}) => {
  const container = page.getByTestId(
    "single select column mode initial selections test container",
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

test("for single select grids in column mode, clicking on the radio button for an unselected row will select that row and deselect an existing row", async ({
  page,
}) => {
  const container = page.getByTestId(
    "single select column mode initial selections test container",
  );

  const row = container.locator(`tbody > tr[aria-rowindex="6"]`);
  const radio = row.getByRole("radio");
  await radio.check();

  const modifiedRow = container.locator(
    `tbody > tr[aria-rowindex="6"][aria-selected="true"]`,
  );
  const previousRow = container.locator(
    `tbody > tr[aria-rowindex="3"][aria-selected="false"]`,
  );
  await expect(modifiedRow).toBeVisible();
  await expect(previousRow).toBeVisible();
});

test("for single select grids in column mode with no selections, clicking on the radio button for a row will select that row", async ({
  page,
}) => {
  const container = page.getByTestId(
    "single select column mode no initial selections test container",
  );

  for (let i = 0; i < 4; i++) {
    const row = container.locator(`tbody > tr[aria-rowindex="${i + 2}"]`);
    await expect(row).toHaveAttribute("aria-selected", "false");
  }

  const row = container.locator(`tbody > tr[aria-rowindex="6"]`);
  const radio = row.getByRole("radio");
  await radio.check();

  const modifiedRow = container.locator(
    `tbody > tr[aria-rowindex="6"][aria-selected="true"]`,
  );

  await expect(modifiedRow).toBeVisible();
});

test("for single select grids in row mode, clicking on an unselected row selects that row and deselects an existing selection", async ({
  page,
}) => {
  const container = page.getByTestId(
    "single select row mode initial selections test container",
  );

  const row = container.locator(
    `tbody > tr[aria-rowindex="5"][aria-selected="false"]`,
  );
  const cell = row.locator('td[aria-colindex="2"]');
  await cell.click();

  const modifiedRow = container.locator(
    `tbody > tr[aria-rowindex="5"][aria-selected="true"]`,
  );
  const previousRow = container.locator(
    `tbody > tr[aria-rowindex="3"][aria-selected="false"]`,
  );

  await expect(modifiedRow).toBeVisible();
  await expect(previousRow).toBeVisible();
});

test("for single select grids, selection via input is possible", async ({
  page,
}) => {
  const container = page.getByTestId(
    "single select both mode no initial selections test container",
  );

  const row3 = container.locator(
    `tbody > tr[aria-rowindex="4"][aria-selected="false"]`,
  );
  const radio = row3.getByRole("radio");
  await radio.check();

  const selectedRow3 = container.locator(
    `tbody > tr[aria-rowindex="4"][aria-selected="true"]`,
  );

  await expect(selectedRow3).toBeVisible();
});

test("for single select grids, selection via row clicking is possible", async ({
  page,
}) => {
  const container = page.getByTestId(
    "single select both mode no initial selections test container",
  );

  const row = container.locator(
    `tbody > tr[aria-rowindex="6"][aria-selected="false"]`,
  );
  const cell = row.locator('td[aria-colindex="3"]');
  await cell.click();

  const selectedRow = container.locator(
    `tbody > tr[aria-rowindex="6"][aria-selected="true"]`,
  );

  await expect(selectedRow).toBeVisible();
});
