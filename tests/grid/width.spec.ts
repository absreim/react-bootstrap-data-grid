import { test, expect, Page } from "@playwright/test";
import { GRID_BODY_DATA_TEST_ID } from "../../src/grid/constants";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

test("grid has width of intrinsic content when width prop unset", async ({
  page,
}) => {
  const grid = page.getByRole("grid");

  await expect(grid).toHaveCSS("width", "650px");
});

async function setWidthAndAssert(
  page: Page,
  optionName: string,
  widthPx: number,
) {
  const widthFieldset = page.getByRole("group", { name: "Width Setting" });
  const option = widthFieldset.getByRole("radio", { name: optionName });
  await option.check();

  const grid = page.getByRole("grid");

  await expect(grid).toHaveCSS("width", `${widthPx}px`);
}

test("grid has width of intrinsic content when width prop set to auto", async ({
  page,
}) => {
  await setWidthAndAssert(page, "auto", 650);
});

test("grid has width of parent when width prop set to parent", async ({
  page,
}) => {
  await setWidthAndAssert(page, "parent", 700);
});

test("grid has specified width when width prop set to number", async ({
  page,
}) => {
  await setWidthAndAssert(page, "number", 400);
});

test("cell widths work correctly", async ({ page }) => {
  const strHeader = page.getByRole("columnheader", { name: "String Column" });
  const numHeader = page.getByRole("columnheader", { name: "Number Column" });
  const dateHeader = page.getByRole("columnheader", { name: "Date Column" });
  const datetimeHeader = page.getByRole("columnheader", {
    name: "Datetime Column",
  });
  const bodyRows = await page
    .getByTestId(GRID_BODY_DATA_TEST_ID)
    .getByRole("row")
    .all();

  await expect(strHeader).toHaveCSS("width", "150px");
  await expect(numHeader).toHaveCSS("width", "100px");
  await expect(dateHeader).toHaveCSS("width", "200px");
  await expect(datetimeHeader).toHaveCSS("width", "200px");

  for (const row of bodyRows) {
    const cells = await row.getByRole("gridcell").all();
    await expect(cells[0]).toHaveCSS("width", "150px");
    await expect(cells[1]).toHaveCSS("width", "100px");
    await expect(cells[2]).toHaveCSS("width", "200px");
    await expect(cells[3]).toHaveCSS("width", "200px");
  }
});
