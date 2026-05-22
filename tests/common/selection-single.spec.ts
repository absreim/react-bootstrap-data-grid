import { test, expect } from "@playwright/test";
import { clickSelectAllAndVerify } from "../util";

["community", "pro"].forEach((edition) => {
  const url = edition === "pro" ? "selection/single/pro" : "selection/single";

  test.describe(`${edition} single mode selection tests`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    test(`${edition} initially selected value should be reflected in the UI for single select models`, async ({
      page,
    }) => {
      const container = page.getByTestId(
        "single select column mode initial selections test container",
      );

      const secondRow = container.locator('tbody > tr[aria-rowindex="3"]');

      await expect(secondRow).toHaveAttribute("aria-selected", "true");
    });

    test(`${edition} for single select grids in column mode, clicking the select all control will deselect an existing selection`, async ({
      page,
    }) => {
      const container = page.getByTestId(
        "single select column mode initial selections test container",
      );

      await clickSelectAllAndVerify(
        container,
        "Deselect all rows",
        "false",
        true,
        true,
        "Select all (disabled)",
        false,
      );
    });

    test(`${edition} for single select grids in column mode, clicking on the radio button for an unselected row will select that row and deselect an existing row`, async ({
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

    test(`${edition} for single select grids in column mode with no selections, clicking on the radio button for a row will select that row`, async ({
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

    test(`${edition} for single select grids in row mode, clicking on an unselected row selects that row and deselects an existing selection`, async ({
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

    test(`${edition} for single select grids, selection via input is possible`, async ({
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

    test(`${edition} for single select grids, selection via row clicking is possible`, async ({
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
  });
});
