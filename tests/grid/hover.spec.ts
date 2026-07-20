import { expect, test } from "@playwright/test";
import {
  GRID_BODY_DATA_TEST_ID,
  GRID_HEADER_DATA_TEST_ID,
} from "../../src/grid/constants";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

const baseBoxShadowValue = "rgba(0, 0, 0, 0) 0px 0px 0px 9999px inset";
const hoverStyleBoxShadowValue =
  "rgba(0, 0, 0, 0.075) 0px 0px 0px 9999px inset";

test(`box shadow for any cell doesn't change when "hover" prop is set to "false"`, async ({
  page,
}) => {
  const gridcells = await page.getByRole("gridcell").all();

  for (const cell of gridcells) {
    await cell.hover();
    await expect(cell).toHaveCSS("box-shadow", baseBoxShadowValue);
  }
});

test(`hover styles should apply for body cells only when "hover" prop is set to "true"`, async ({
  page,
}) => {
  const hoverStyleToggle = page.getByRole("checkbox", { name: "Hover Styles" });
  await hoverStyleToggle.check();

  const gridBody = page.getByTestId(GRID_BODY_DATA_TEST_ID);
  const gridHeader = page.getByTestId(GRID_HEADER_DATA_TEST_ID);

  const bodyRows = await gridBody.getByRole("row").all();

  const headerRow = gridHeader.getByRole("row");
  const headerCells = await headerRow.getByRole("cell").all();

  await headerRow.hover();
  for (const cell of headerCells) {
    await expect(cell).toHaveCSS("box-shadow", baseBoxShadowValue);
  }

  for (const row of bodyRows) {
    await row.hover();
    const rowCells = await row.getByRole("gridcell").all();
    for (const cell of rowCells) {
      await expect(cell).toHaveCSS("box-shadow", hoverStyleBoxShadowValue);
    }
  }
});
