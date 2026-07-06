import { expect, Page, test } from "@playwright/test";
import {
  GRID_BODY_DATA_TEST_ID,
  GRID_HEADER_DATA_TEST_ID,
} from "@/grid/constants";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

async function assertHorizontalBorders(page: Page): Promise<void> {
  const gridcells = await page.getByRole("gridcell").all();

  for (const gridcell of gridcells) {
    await expect(gridcell).toHaveCSS(
      "border-bottom-color",
      "rgb(222, 226, 230)",
    );
    await expect(gridcell).toHaveCSS("border-bottom-style", "solid");
    await expect(gridcell).toHaveCSS("border-bottom-width", "1px");
  }
}

test('unset "borders" prop results in horizontal borders', async ({ page }) => {
  await assertHorizontalBorders(page);
});

test('"borders" prop being set to "horizontal" results in horizontal borders', async ({
  page,
}) => {
  const horizontalBorderRadio = page.getByRole("radio", { name: "horizontal" });
  await horizontalBorderRadio.check();

  await assertHorizontalBorders(page);
});

test('"borders" prop being set to "none" results in no borders', async ({ page }) => {
  const borderSettingGroup = page.getByRole("group", { name: "Border Setting" });
  const noneBorderRadio = borderSettingGroup.getByRole("radio", {
    name: "none",
  });
  await noneBorderRadio.check();

  const gridcells = await page.getByRole("gridcell").all();

  for (const gridcell of gridcells) {
    await expect(gridcell).toHaveCSS("border-bottom-width", "0px");
  }
})

test('"borders" prop being set to "full" horizontal and vertical borders', async ({ page }) => {
  const borderSettingGroup = page.getByRole("group", {
    name: "Border Setting",
  });
  const fullBorderRadio = borderSettingGroup.getByRole("radio", {
    name: "full",
  });
  await fullBorderRadio.check();

  const grid = page.getByRole("grid");
  const headerGroup = page.getByTestId(GRID_HEADER_DATA_TEST_ID);
  const headerRow = headerGroup.getByRole("row");
  const bodyGroup = page.getByTestId(GRID_BODY_DATA_TEST_ID);
  const bodyRows = await bodyGroup.getByRole("row").all();
  const nonLastBodyRows = bodyRows.slice(0, bodyRows.length - 1);
  const lastBodyRow = bodyRows[bodyRows.length - 1];

  await expect(grid).toHaveCSS("border-bottom-width", "1px");
  await expect(grid).toHaveCSS("border-top-width", "1px");
  await expect(grid).toHaveCSS("border-left-width", "1px");
  await expect(grid).toHaveCSS("border-right-width", "1px");

  await expect(headerRow).toHaveCSS("border-bottom-width", "1px");
  for (const row of nonLastBodyRows) {
    await expect(row).toHaveCSS("border-bottom-width", "1px");

    const gridcells = await row.getByRole("gridcell").all();
    const nonLastGridcells = gridcells.slice(0, gridcells.length - 1);
    const lastGridcell = gridcells[gridcells.length - 1];

    for (const cell of nonLastGridcells) {
      await expect(cell).toHaveCSS("border-right-width", "1px");
    }

    await expect(lastGridcell).toHaveCSS("border-bottom-width", "0px");
  }
  await expect(lastBodyRow).toHaveCSS("border-bottom-width", "0px");
});
