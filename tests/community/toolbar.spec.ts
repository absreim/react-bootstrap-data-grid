import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("toolbar");
});

test("Right arrow presses work as expected", async ({ page }) => {
  const twoElementContainer = page.getByTestId(
    "two-element toolbar test container",
  );
  await page.keyboard.press("Tab");
  let filterButton = twoElementContainer.locator(
    'button[data-toolbar-option="filtering"]:focus',
  );
  await expect(filterButton).toBeVisible();

  await page.keyboard.press("ArrowRight");
  let exportButton = twoElementContainer.locator(
    'button[data-toolbar-option="exporting"]:focus',
  );
  await expect(exportButton).toBeVisible();

  await page.keyboard.press("ArrowRight");
  filterButton = twoElementContainer.locator(
    'button[data-toolbar-option="filtering"]:focus',
  );
  await expect(filterButton).toBeVisible();
});

test("Left arrow presses work as expected", async ({ page }) => {
  const twoElementContainer = page.getByTestId(
    "two-element toolbar test container",
  );
  await page.keyboard.press("Tab");
  let filterButton = twoElementContainer.locator(
    'button[data-toolbar-option="filtering"]:focus',
  );
  await expect(filterButton).toBeVisible();

  await page.keyboard.press("ArrowLeft");
  let exportButton = twoElementContainer.locator(
    'button[data-toolbar-option="exporting"]:focus',
  );
  await expect(exportButton).toBeVisible();

  await page.keyboard.press("ArrowLeft");
  filterButton = twoElementContainer.locator(
    'button[data-toolbar-option="filtering"]:focus',
  );
  await expect(filterButton).toBeVisible();
});

// "focusable button" here means that the next time the toolbar is tabbed into,
// that button is focused
test("Clicking on a button causes it to be the focusable button of the toolbar", async ({
  page,
}) => {
  const twoElementContainer = page.getByTestId(
    "two-element toolbar test container",
  );

  await page.keyboard.press("Tab");
  let filterButton = twoElementContainer.locator(
    'button[data-toolbar-option="filtering"]:focus',
  );
  await expect(filterButton).toBeVisible();

  let exportButton = twoElementContainer.getByRole("button", {
    name: "Export",
  });
  await exportButton.click();
  await exportButton.click();
  await page.keyboard.press("Tab");

  const singleElementContainer = page.getByTestId(
    "single-element toolbar test container",
  );
  let singleElemExportButton = singleElementContainer.locator(
    'button[data-toolbar-option="exporting"]:focus',
  );
  await expect(singleElemExportButton).toBeVisible();

  await page.keyboard.press("Shift+Tab");
  exportButton = twoElementContainer.locator(
    'button[data-toolbar-option="exporting"]:focus',
  );
  await expect(exportButton).toBeVisible();
});
