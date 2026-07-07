import { expect, Page, test } from "@playwright/test";
import {
  GRID_BODY_DATA_TEST_ID,
  GRID_HEADER_DATA_TEST_ID,
} from "@/grid/constants";

const expectedDividerColor = "rgb(0, 0, 0)";
const expectedPrimaryBorderColor = "rgb(13, 110, 253)";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");

  const borderVariantDropdown = page.getByRole("combobox", {
    name: "Select border variant",
  });
  await borderVariantDropdown.selectOption("primary");
});

async function checkHorizontalBorders(page: Page): Promise<void> {
  const headerCells = await page.getByRole("columnheader").all();
  const gridcells = await page.getByRole("gridcell").all();
  const cells = headerCells.concat(gridcells);

  await expect(headerCells).toHaveLength(4);
  await expect(gridcells).toHaveLength(40);

  for (const cell of cells) {
    await expect(cell).toHaveCSS(
      "border-bottom-color",
      expectedPrimaryBorderColor,
    );
    await expect(cell).toHaveCSS("border-bottom-style", "solid");
    await expect(cell).toHaveCSS("border-bottom-width", "1px");
  }
}

test("border variant works for horizontal border setting", async ({ page }) => {
  await checkHorizontalBorders(page);
});

test("border variant works for full border setting", async ({ page }) => {
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

  await expect(grid).toHaveCSS(
    "border-bottom-color",
    expectedPrimaryBorderColor,
  );
  await expect(grid).toHaveCSS("border-top-color", expectedPrimaryBorderColor);
  await expect(grid).toHaveCSS("border-left-color", expectedPrimaryBorderColor);
  await expect(grid).toHaveCSS(
    "border-right-color",
    expectedPrimaryBorderColor,
  );

  await expect(headerRow).toHaveCSS(
    "border-bottom-color",
    expectedPrimaryBorderColor,
  );
  for (const row of nonLastBodyRows) {
    await expect(row).toHaveCSS(
      "border-bottom-color",
      expectedPrimaryBorderColor,
    );

    const gridcells = await row.getByRole("gridcell").all();
    const nonLastGridcells = gridcells.slice(0, gridcells.length - 1);

    for (const cell of nonLastGridcells) {
      await expect(cell).toHaveCSS(
        "border-right-color",
        expectedPrimaryBorderColor,
      );
    }
  }
});

test("border variant overrides base color variant border color", async ({ page }) => {
  const variantDropdown = page.getByRole("combobox", {
    name: "Select variant",
  });
  await variantDropdown.selectOption("success");

  await checkHorizontalBorders(page);
});

test("divider color overrides border variant color", async ({ page }) => {
  const dividerToggle = page.getByRole("checkbox", { name: "Body Divider" });
  await dividerToggle.check();

  const gridHeader = page.getByTestId(GRID_HEADER_DATA_TEST_ID);
  const headerCells = await gridHeader.getByRole("columnheader").all();

  expect(headerCells).toHaveLength(4);

  for (const cell of headerCells) {
    await expect(cell).toHaveCSS("border-bottom-color", expectedDividerColor);
  }
});
