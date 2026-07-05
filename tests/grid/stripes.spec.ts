import { test, expect } from "@playwright/test";

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
