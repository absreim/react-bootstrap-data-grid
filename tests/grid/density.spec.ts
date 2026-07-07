import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

test("non-small grid has 8px cell padding", async ({ page }) => {
  const headerCells = await page.getByRole("columnheader").all();
  const gridcells = await page.getByRole("gridcell").all();
  const cells = headerCells.concat(gridcells);

  expect(headerCells).toHaveLength(4);
  expect(gridcells).toHaveLength(40);

  for (const cell of cells) {
    await expect(cell).toHaveCSS("padding-left", "8px");
    await expect(cell).toHaveCSS("padding-right", "8px");
    await expect(cell).toHaveCSS("padding-top", "8px");
    await expect(cell).toHaveCSS("padding-bottom", "8px");
  }
});

test("small grid has 4px cell padding", async ({ page }) => {
  const denseGridSwitch = page.getByRole("checkbox", { name: "Dense Grid" });
  await denseGridSwitch.check();

  const headerCells = await page.getByRole("columnheader").all();
  const gridcells = await page.getByRole("gridcell").all();
  const cells = headerCells.concat(gridcells);

  expect(headerCells).toHaveLength(4);
  expect(gridcells).toHaveLength(40);

  for (const cell of cells) {
    await expect(cell).toHaveCSS("padding-left", "4px");
    await expect(cell).toHaveCSS("padding-right", "4px");
    await expect(cell).toHaveCSS("padding-top", "4px");
    await expect(cell).toHaveCSS("padding-bottom", "4px");
  }
});
