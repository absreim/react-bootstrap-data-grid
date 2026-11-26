import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid/selection");
});

const infoBgColor = "rgb(207, 244, 252)";
const successBgColor = "rgb(209, 231, 221)";
const dangerBgColor = "rgb(248, 215, 218)";
const transparentInsetShadow = "rgba(0, 0, 0, 0) 0px 0px 0px 9999px inset";
const infoActiveShadow = "rgb(186, 220, 227) 0px 0px 0px 9999px inset";
const successActiveShadow = "rgb(188, 208, 199) 0px 0px 0px 9999px inset";
const dangerActiveShadow = "rgb(223, 193, 196) 0px 0px 0px 9999px inset";
const warningFocusShadow = "rgba(255, 193, 7, 0.25) 0px 0px 0px 4px";
const secondaryFocusShadow = "rgba(108, 117, 125, 0.25) 0px 0px 0px 4px";
const primaryFocusShadow = "rgba(13, 110, 253, 0.25) 0px 0px 0px 4px";

test("body select cell styles work correctly", async ({ page }) => {
  const firstRowSelectCell = page.locator(
    'div[aria-rowindex="2"] > div[aria-colindex="1"]',
  );
  await expect(firstRowSelectCell).toHaveCSS("background-color", dangerBgColor);
  await firstRowSelectCell.click();
  await expect(firstRowSelectCell).toHaveCSS(
    "box-shadow",
    `${dangerActiveShadow}, ${warningFocusShadow}`,
  );

  const secondRowSelectCell = page.locator(
    'div[aria-rowindex="3"] > div[aria-colindex="1"]',
  );
  await expect(secondRowSelectCell).toHaveCSS("background-color", infoBgColor);
  await secondRowSelectCell.click();
  await expect(secondRowSelectCell).toHaveCSS(
    "box-shadow",
    `${infoActiveShadow}, ${primaryFocusShadow}`,
  );

  const thirdRowSelectCell = page.locator(
    'div[aria-rowindex="4"] > div[aria-colindex="1"]',
  );
  await expect(thirdRowSelectCell).toHaveCSS(
    "background-color",
    successBgColor,
  );
  await thirdRowSelectCell.click();
  await expect(thirdRowSelectCell).toHaveCSS(
    "box-shadow",
    `${successActiveShadow}, ${secondaryFocusShadow}`,
  );
});

test("header select cell styles work correctly", async ({ page }) => {
  const headerRowSelectCell = page.locator(
    'div[aria-rowindex="1"] > div[aria-colindex="1"]',
  );

  await expect(headerRowSelectCell).toHaveCSS("background-color", successBgColor);
  await headerRowSelectCell.click();
  await expect(headerRowSelectCell).toHaveCSS(
    "box-shadow",
    `${transparentInsetShadow}, ${warningFocusShadow}`,
  );
});
