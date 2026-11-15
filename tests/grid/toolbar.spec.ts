import { expect, test } from "@playwright/test";
import { downloadAndRead, validateGridContents } from "../util";
import { getTestContentDisplayRows } from "../util";
import { toolbarUiContainerTestId } from "../constants";

const testDisplayRows = getTestContentDisplayRows(25);
const expectedExportJson = [
  {
    id: 0,
    data: {
      strCol: "1st row string",
      numCol: 1,
      date: "2026-01-01",
      datetime: "2026-01-01T01:01",
    },
  },
  {
    id: 1,
    data: {
      strCol: "2nd row string",
      numCol: 2,
      date: "2026-02-02",
      datetime: "2026-02-02T02:02",
    },
  },
];

test.beforeEach(async ({ page }) => {
  await page.goto("grid/toolbar");
});

test("main component spacing works as expected", async ({ page }) => {
  const topLevelContainer = page.getByTestId("rbdg-top-level-grid-container");
  await expect(topLevelContainer).toContainClass("gap-2");

  const spacingGroup = page.getByRole("group", {
    name: "Main Component Spacing",
  });
  const fiveOption = spacingGroup.getByRole("radio", { name: "5" });
  await fiveOption.check();
  await expect(topLevelContainer).toContainClass("gap-5");

  const zeroOption = spacingGroup.getByRole("radio", { name: "0" });
  await zeroOption.check();
  await expect(topLevelContainer).toContainClass("gap-0");
});

test("filtering works correctly", async ({ page }) => {
  const filteringButton = page.getByRole("button", { name: "Filtering" });
  await filteringButton.click();

  const strColFilterCheckbox = page.getByRole("checkbox", {
    name: "String Column Column Filter Toggle",
  });
  await strColFilterCheckbox.check();

  const strColOperatorSelect = page.getByRole("combobox", {
    name: "String Column Column Filter Operator Selection",
  });
  await strColOperatorSelect.selectOption({ label: "Ends With" });

  const strColFilterValue = page.getByRole("textbox", {
    name: "String Column Column Filter Value",
  });
  await strColFilterValue.fill("th row string");

  const submitButton = page.getByRole("button", { name: "Submit" });
  await submitButton.click();

  const grid = page.getByRole("grid");
  await expect(grid).toHaveAttribute("aria-rowcount", "23");

  const bodyElem = page.getByTestId("rbdg-body-rowgroup");
  await validateGridContents(
    bodyElem,
    testDisplayRows.slice(3, 13),
    0,
    0,
    "gridcell",
  );

  const page3Link = page.getByRole("link", { name: "3" });
  await page3Link.click();

  await validateGridContents(
    bodyElem,
    testDisplayRows.slice(23, 25),
    20,
    0,
    "gridcell",
  );
});

test("export works correctly", async ({ page }) => {
  const filteringButton = page.getByRole("button", { name: "Filtering" });
  await filteringButton.click();

  const dateColFilterCheckbox = page.getByRole("checkbox", {
    name: "Date Column Column Filter Toggle",
  });
  await dateColFilterCheckbox.check();

  const dateColOperatorSelect = page.getByRole("combobox", {
    name: "Date Column Column Filter Operator Selection",
  });
  await dateColOperatorSelect.selectOption({ label: "End At" });

  const dateFilterValue = page.getByRole("textbox", {
    name: "Date Column Column Filter End Date",
  });
  await dateFilterValue.fill("2026-02-28");

  const submitButton = page.getByRole("button", { name: "Submit" });
  await submitButton.click();

  const exportButton = page.getByRole("button", { name: "Export" });
  await exportButton.click();

  const dataSelectGroup = page.getByRole("group", {
    name: "Choose data to export",
  });
  const filteredOption = dataSelectGroup.getByRole("radio", {
    name: "After filters applied",
  });
  await filteredOption.check();

  const toolbarUiContainer = page.getByTestId(toolbarUiContainerTestId);

  const fileContents = await downloadAndRead(page, toolbarUiContainer);
  const fileJson = JSON.parse(fileContents);
  expect(fileJson).toEqual(expectedExportJson);
});
