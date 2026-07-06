import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

test("non-small grid has 8px cell padding", async ({ page }) => {
  const gridcells = await page.getByRole("gridcell").all();

  for (const cell of gridcells) {
    await expect(cell).toHaveCSS("padding-left", "8px");
    await expect(cell).toHaveCSS("padding-right", "8px");
    await expect(cell).toHaveCSS("padding-top", "8px");
    await expect(cell).toHaveCSS("padding-bottom", "8px");
  }
});

test("small grid has 4px cell padding", async ({ page }) => {
  const denseGridSwitch = page.getByRole("checkbox", { name: "Dense Grid" });
  await denseGridSwitch.check();

  const gridcells = await page.getByRole("gridcell").all();

  for (const cell of gridcells) {
    await expect(cell).toHaveCSS("padding-left", "4px");
    await expect(cell).toHaveCSS("padding-right", "4px");
    await expect(cell).toHaveCSS("padding-top", "4px");
    await expect(cell).toHaveCSS("padding-bottom", "4px");
  }
});
