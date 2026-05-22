import { test, expect } from "@playwright/test";
import { clickSelectAllAndVerify } from "../util";

["community", "pro"].forEach((edition) => {
  const url = edition === "pro" ? "selection/multi/pro" : "selection/multi";

  test.describe(`${edition} multi mode selection tests`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    test(`${edition} initially selected values should be reflected in the UI for multiselect models`, async ({
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

    test(`${edition} for grids of multi select type and column mode with existing columns selected, clicking the select column header cell will deselect all rows`, async ({
      page,
    }) => {
      const container = page.getByTestId(
        "multi select column mode initial selections test container",
      );

      await clickSelectAllAndVerify(
        container,
        "Deselect all rows",
        "false",
        true,
        true,
        "Select all rows",
        false,
      );
    });

    test(`${edition} for grids of multi select type and column mode with no existing columns selected, clicking the select column header cell will select all rows`, async ({
      page,
    }) => {
      const container = page.getByTestId(
        "multi select column mode no initial selections test container",
      );

      await clickSelectAllAndVerify(
        container,
        "Select all rows",
        "true",
        false,
        false,
        "Deselect all rows",
        true,
      );
    });

    test(`${edition} for grids of multi select type and column mode, clicking on the selection checkbox for an unselected row will select that row`, async ({
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

    test(`${edition} for grids of multi select type and column mode, clicking on the selection checkbox for a selected row will deselect that row`, async ({
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

    test(`${edition} for grids of multi select type and row mode, clicking on an unselected row selects that row`, async ({
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

    test(`${edition} for grids of multi select type and row mode, clicking on a selected row deselects that row`, async ({
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

    test(`${edition} for multi select grids, selection via both input and row clicking are possible`, async ({
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

    test(`${edition} for multi select grids in 'both' mode, the select all control should work`, async ({
      page,
    }) => {
      const container = page.getByTestId(
        "multi select both mode initial selections test container",
      );

      await clickSelectAllAndVerify(
        container,
        "Deselect all rows",
        "false",
        true,
        true,
        "Select all rows",
        false,
      );
    });

    test(`${edition} for multi select grids, no rows causes Select All checkbox to be disabled`, async ({
      page,
    }) => {
      const container = page.getByTestId("multi select no rows test container");

      const selectHeaderCell = container.locator(
        'thead > tr > th[aria-colindex="1"]',
      );
      const selectAllInput = selectHeaderCell.getByRole("checkbox", {
        name: "Select all (disabled)",
      });

      await expect(selectAllInput).toBeDisabled();
    });

    test(`${edition} for multi select grid with all rows selected, the Select All checkbox deselects all rows and is not in the indeterminate state`, async ({
      page,
    }) => {
      const container = page.getByTestId("full selection test container");

      await clickSelectAllAndVerify(
        container,
        "Deselect all rows",
        "false",
        true,
        false,
        "Select all rows",
        false,
      );
    });
  });
});
