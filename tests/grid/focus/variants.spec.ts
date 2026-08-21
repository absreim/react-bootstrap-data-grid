import { expect, Locator, Page, test } from "@playwright/test";

const primaryShadow =
  "rgba(0, 0, 0, 0) 0px 0px 0px 9999px inset, rgba(13, 110, 253, 0.25) 0px 0px 0px 4px";
const dangerShadow =
  "rgba(0, 0, 0, 0) 0px 0px 0px 9999px inset, rgba(220, 53, 69, 0.25) 0px 0px 0px 4px";
const warningShadow =
  "rgba(0, 0, 0, 0) 0px 0px 0px 9999px inset, rgba(255, 193, 7, 0.25) 0px 0px 0px 4px";
const infoShadow =
  "rgba(0, 0, 0, 0) 0px 0px 0px 9999px inset, rgba(13, 202, 240, 0.25) 0px 0px 0px 4px";
const successShadow =
  "rgba(0, 0, 0, 0) 0px 0px 0px 9999px inset, rgba(25, 135, 84, 0.25) 0px 0px 0px 4px";
const secondaryShadow =
  "rgba(0, 0, 0, 0) 0px 0px 0px 9999px inset, rgba(108, 117, 125, 0.25) 0px 0px 0px 4px";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");

  const focusVariantsSwitch = page.getByRole("checkbox", {
    name: "Focus Variants",
  });
  await focusVariantsSwitch.click();
});

const verifyElementShadow: (locator: Locator, shadowCss: string) => Promise<void> = async (locator, shadowCss) => {
  await locator.click();
  await expect(locator).toBeFocused();
  await expect(locator).toHaveCSS("box-shadow", shadowCss);
}

const verifyHeaderShadow: (page: Page, cellText: string, shadowCss: string) => Promise<void> = async (page, cellText, shadowCss) => {
  const headerCell = page.getByRole("columnheader", {
    name: cellText,
  });
  await verifyElementShadow(headerCell, shadowCss);
}

test("Header focus variants work correctly", async ({ page }) => {
  await verifyHeaderShadow(page, "String Column", warningShadow);
  await verifyHeaderShadow(page, "Number Column", primaryShadow);
  await verifyHeaderShadow(page, "Date Column", successShadow);
  await verifyHeaderShadow(page, "Datetime Column", successShadow);
});

test("Body cell variants work correctly", async ({ page }) => {
  const firstColBodyCells = await page.getByRole("gridcell", { name: /row string$/ }).all();
  expect(firstColBodyCells).toHaveLength(10);
  for (const cell of firstColBodyCells) {
    await verifyElementShadow(cell, secondaryShadow);
  }

  const numOneCell = page.getByRole("gridcell", { name: "1", exact: true });
  await verifyElementShadow(numOneCell, dangerShadow);

  const row3Cells = ["3", "1772496000000", "2026-03-03T03:03"].map((name) =>
    page.getByRole("gridcell", { name, exact: true }),
  );
  for (const cell of row3Cells) {
    await verifyElementShadow(cell, infoShadow);
  }

  const row4Cells = ["4", "1775260800000", "2026-04-04T04:04"].map((name) =>
    page.getByRole("gridcell", { name, exact: true }),
  );
  for (const cell of row4Cells) {
    await verifyElementShadow(cell, successShadow);
  }
});
