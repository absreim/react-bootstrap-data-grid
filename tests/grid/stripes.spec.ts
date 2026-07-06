import { test, expect } from "@playwright/test";
import {
  GRID_BODY_DATA_TEST_ID,
  GRID_HEADER_DATA_TEST_ID,
} from "@/grid/constants";

const stripedBoxShadowValue = "rgba(0, 0, 0, 0.05) 0px 0px 0px 9999px inset";
const unstripedBoxShadowValue = "rgba(0, 0, 0, 0) 0px 0px 0px 9999px inset";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

test("no cells are striped if no stripes prop is specified", async ({ page }) => {
  const gridcells = await page.getByRole("gridcell").all();

  for (const cell of gridcells) {
    await expect(cell).toHaveCSS("box-shadow", unstripedBoxShadowValue);
  }
});

test('no cells are striped if "none" is specified as the stripes prop', async ({
  page,
}) => {
  const stripesFieldset = page.getByRole("group", { name: "Stripe Setting" });
  const option = stripesFieldset.getByRole("radio", { name: "none" });
  await option.check();

  const gridcells = await page.getByRole("gridcell").all();

  for (const cell of gridcells) {
    await expect(cell).toHaveCSS("box-shadow", unstripedBoxShadowValue);
  }
});

test('"rows" setting applies stripes properly', async ({ page }) => {
  const stripesFieldset = page.getByRole("group", { name: "Stripe Setting" });
  const option = stripesFieldset.getByRole("radio", { name: "rows" });
  await option.check();

  const headerRowCells = await page.getByTestId(GRID_HEADER_DATA_TEST_ID).getByRole("gridcell").all();

  const gridBody = page.getByTestId(GRID_BODY_DATA_TEST_ID);
  const oddBodyRowCells = await gridBody
    .locator("div:nth-child(odd) > div")
    .all();
  const evenBodyRowCells = await gridBody
    .locator("div:nth-child(even) > div")
    .all();

  for (const cell of headerRowCells) {
    await expect(cell).toHaveCSS("box-shadow", unstripedBoxShadowValue);
  }

  for (const cell of oddBodyRowCells) {
    await expect(cell).toHaveCSS("box-shadow", stripedBoxShadowValue);
  }

  for (const cell of evenBodyRowCells) {
    await expect(cell).toHaveCSS("box-shadow", unstripedBoxShadowValue);
  }
})

test('"columns" setting applies stripes properly', async ({ page }) => {
  const stripesFieldset = page.getByRole("group", { name: "Stripe Setting" });
  const option = stripesFieldset.getByRole("radio", { name: "columns" });
  await option.check();

  const evenColCells = await page.getByRole("grid").locator("div > div > div:nth-child(even)").all();
  const oddColCells = await page
    .getByRole("grid")
    .locator("div > div > div:nth-child(odd)")
    .all();

  for (const cell of evenColCells) {
    await expect(cell).toHaveCSS("box-shadow", stripedBoxShadowValue);
  }
  for (const cell of oddColCells) {
    await expect(cell).toHaveCSS("box-shadow", unstripedBoxShadowValue);
  }
});
