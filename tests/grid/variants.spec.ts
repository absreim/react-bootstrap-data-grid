import { expect, test } from "@playwright/test";

const expectedSuccessBgColor = "rgb(209, 231, 221)";
const expectedSuccessBorderColor = "rgb(167, 185, 177)";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");

  const variantDropdown = page.getByRole("combobox", { name: "Select variant" });
  await variantDropdown.selectOption("success");
});

test("border and bg colors work correctly under default settings", async ({ page }) => {
  const gridcells = await page.getByRole("gridcell").all();

  await expect(gridcells).toHaveLength(40);

  for (const cell of gridcells) {
    await expect(cell).toHaveCSS("background-color", expectedSuccessBgColor);
    await expect(cell).toHaveCSS(
      "border-bottom-color",
      expectedSuccessBorderColor,
    );
  }
});
