import { expect, Page, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid/sorting");
});

const keyboardTabToGrid: (page: Page) => Promise<void> = async (page) => {
  let tabCount = 0;
  do {
    await page.keyboard.press("Shift+Tab");
    tabCount++;
  } while (
    (await page.evaluate(() => document.activeElement?.tagName !== "BUTTON")) &&
    tabCount < 2
  );

  const strColHeaderCellButton = page.getByRole("button", {
    name: "String Column",
  });
  await expect(strColHeaderCellButton).toBeFocused();
};

test("keyboard focus navigation from a header cell button works", async ({
  page,
}) => {
  await keyboardTabToGrid(page);

  await page.keyboard.press("ArrowDown");
  const secondStrCell = page.getByRole("gridcell", { name: "5th row string" });
  await expect(secondStrCell).toBeFocused();

  await page.keyboard.press("ArrowUp");
  const strColHeaderCellButton = page.getByRole("button", {
    name: "String Column",
  });
  await expect(strColHeaderCellButton).toBeFocused();

  await page.keyboard.press("ArrowRight");
  const numColHeaderCellButton = page.getByRole("button", {
    name: "Number Column",
  });
  await expect(numColHeaderCellButton).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  await expect(strColHeaderCellButton).toBeFocused();
});

test("Clicking on a header cell button focuses on the button", async ({
  page,
}) => {
  const dateColHeaderCellButton = page.getByRole("button", {
    name: "Date Column",
  });

  await dateColHeaderCellButton.click();
  await expect(dateColHeaderCellButton).toBeFocused();
});

test("Toggling sortability of a column causes the tabindex to toggle between the button and cell properly", async ({
  page,
}) => {
  const datetimeColHeaderCellButton = page.getByRole("button", {
    name: "Datetime Column",
  });
  await datetimeColHeaderCellButton.click();
  await expect(datetimeColHeaderCellButton).toBeFocused();

  const datetimeToggle = page.getByRole("checkbox", {
    name: "Datetime Column",
  });
  await datetimeToggle.uncheck();

  await page.keyboard.press("Tab");

  const datetimeColHeaderCell = page.getByRole("columnheader", {
    name: "Datetime Column",
  });
  await expect(datetimeColHeaderCell).toBeFocused();
});
