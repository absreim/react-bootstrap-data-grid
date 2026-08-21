import { expect, Page, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

const keyboardTabToGrid: (page: Page) => Promise<void> = async (page) => {
  let tabCount = 0;
  do {
    await page.keyboard.press("Shift+Tab");
    tabCount++;
  } while (
    (await page.evaluate(
      () => document.activeElement?.getAttribute("aria-colindex") !== "1",
    )) &&
    tabCount < 2
  );

  const strColHeaderCell = page.getByRole("columnheader", {
    name: "String Column",
  });
  await expect(strColHeaderCell).toBeFocused();
};

test("Horizontal navigation works", async ({ page }) => {
  await keyboardTabToGrid(page);

  await page.keyboard.press("ArrowRight");
  const numColHeaderCell = page.getByRole("columnheader", {
    name: "Number Column",
  });
  await expect(numColHeaderCell).toBeFocused();

  await page.keyboard.press("ArrowRight");
  const dateColHeaderCell = page.getByRole("columnheader", {
    name: "Date Column",
  });
  await expect(dateColHeaderCell).toBeFocused();

  await page.keyboard.press("ArrowRight");
  const datetimeColHeaderCell = page.getByRole("columnheader", {
    name: "Datetime Column",
  });
  await expect(datetimeColHeaderCell).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(datetimeColHeaderCell).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  await expect(dateColHeaderCell).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  await expect(numColHeaderCell).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  const strColHeaderCell = page.getByRole("columnheader", {
    name: "String Column",
  });
  await expect(strColHeaderCell).toBeFocused();
});

test("Vertical navigation works", async ({ page }) => {
  await keyboardTabToGrid(page);

  await page.keyboard.press("ArrowUp");
  const strColHeaderCell = page.getByRole("columnheader", {
    name: "String Column",
  });
  await expect(strColHeaderCell).toBeFocused();

  await page.keyboard.press("ArrowDown");
  const firstStrCell = page.getByRole("gridcell", { name: "1st row string" });
  await expect(firstStrCell).toBeFocused();

  await page.keyboard.press("ArrowDown");
  const secondStrCell = page.getByRole("gridcell", { name: "2nd row string" });
  await expect(secondStrCell).toBeFocused();

  const tenthDateCell = page.getByRole("gridcell", { name: "1791590400000" });
  await tenthDateCell.click();
  await expect(tenthDateCell).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(tenthDateCell).toBeFocused();

  await page.keyboard.press("ArrowUp");
  const ninthDateCell = page.getByRole("gridcell", { name: "1788912000000" });
  await expect(ninthDateCell).toBeFocused();
});

test("Tabbing away and back goes causes previous cell to be focused", async ({ page }) => {
  const fifthDatetimeCell = page.getByRole("gridcell", {
    name: "2026-05-05T05:05",
  });
  await fifthDatetimeCell.click();
  await expect(fifthDatetimeCell).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  const fifthDateCell = page.getByRole("gridcell", {
    name: "1777939200000"
  });
  await expect(fifthDateCell).toBeFocused();

  // Note: for Webkit, if one wanted to directly press Shift+Tab after clicking,
  // the following workaround is needed. Pressing the left arrow in the step
  // above eliminates the need for the workaround.
  // await page.keyboard.press("Tab");
  // await page.keyboard.press("Shift+Tab");

  await page.keyboard.press("Shift+Tab");
  const headerRowDropdown = page.getByRole("combobox", {
    name: "Select header row variant",
  });
  await expect(headerRowDropdown).toBeFocused();

  await page.keyboard.press("Tab")
  await expect(fifthDateCell).toBeFocused();
});
