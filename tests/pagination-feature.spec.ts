import { test, expect } from "@playwright/test";
import { validateGridContents } from "./util";

test.beforeEach(async ({ page }) => {
  await page.goto("pagination/test/feature");
});

test("numerical buttons work correctly", async ({ page }) => {
  const container = page.getByTestId("15-row test container");
  const gridTable = container.locator('table[aria-rowcount="16"]');
  const tbody = gridTable.locator("tbody");

  const expectedInitialContents: string[][] = [["1"], ["2"], ["3"], ["4"], ["5"]];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("link", { name: "2" }).click();
  await expect(container.locator('tr[data-rowindex="5"]')).toBeVisible();
  const expectedSecondPageContents: string[][] = [
    ["6"],
    ["7"],
    ["8"],
    ["9"],
    ["10"],
  ];
  await validateGridContents(tbody, expectedSecondPageContents);

  await container.getByRole("link", { name: "3" }).click();
  await expect(container.locator('tr[data-rowindex="10"]')).toBeVisible();
  const expectedThirdPageContents: string[][] = [
    ["11"],
    ["12"],
    ["13"],
    ["14"],
    ["15"],
  ];
  await validateGridContents(tbody, expectedThirdPageContents);
})

test("next and previous buttons work correctly", async ({ page }) => {
  const container = page.getByTestId("15-row test container");
  const gridTable = container.locator('table[aria-rowcount="16"]');
  const tbody = gridTable.locator("tbody");

  const expectedInitialContents: string[][] = [
    ["1"],
    ["2"],
    ["3"],
    ["4"],
    ["5"],
  ];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("link", { name: "Next" }).click();
  await expect(container.locator('tr[data-rowindex="5"]')).toBeVisible();
  const expectedSecondPageContents: string[][] = [
    ["6"],
    ["7"],
    ["8"],
    ["9"],
    ["10"],
  ];
  await validateGridContents(tbody, expectedSecondPageContents);

  await container.getByRole("link", { name: "Next" }).click();
  await expect(container.locator('tr[data-rowindex="10"]')).toBeVisible();
  const expectedThirdPageContents: string[][] = [
    ["11"],
    ["12"],
    ["13"],
    ["14"],
    ["15"],
  ];
  await validateGridContents(tbody, expectedThirdPageContents);

  await container.getByRole("link", { name: "Previous" }).click();
  await expect(container.locator('tr[data-rowindex="5"]')).toBeVisible();
  await validateGridContents(tbody, expectedSecondPageContents);
})

test("feature preserves page index when possible when selecting new page size", async ({ page }) => {
  const container = page.getByTestId("15-row test container");
  const gridTable = container.locator('table[aria-rowcount="16"]');
  const tbody = gridTable.locator("tbody");

  await container.getByRole("link", { name: "2" }).click();
  const expectedSecondPageContents: string[][] = [
    ["6"],
    ["7"],
    ["8"],
    ["9"],
    ["10"],
  ];
  await validateGridContents(tbody, expectedSecondPageContents);

  await container.locator('select[aria-label="Number of Rows per Page"]').selectOption("1");
  await expect(container.locator('tr[data-rowindex="14"]')).toBeVisible();

  const expectedTenSizeSecondPageContents: string[][] = [
    ["11"],
    ["12"],
    ["13"],
    ["14"],
    ["15"],
  ];
  await validateGridContents(tbody, expectedTenSizeSecondPageContents);

  await container
    .locator('select[aria-label="Number of Rows per Page"]')
    .selectOption("0");
  await expect(container.locator('tr[data-rowindex="9"]')).toBeVisible();
  await validateGridContents(tbody, expectedSecondPageContents);
})

test("feature snaps to largest possible index if new page size would cause index to be too large", async ({ page }) => {
  const container = page.getByTestId("15-row test container");
  const gridTable = container.locator('table[aria-rowcount="16"]');
  const tbody = gridTable.locator("tbody");

  await container.getByRole("link", { name: "3" }).click();
  const expectedThirdPageContents: string[][] = [
    ["11"],
    ["12"],
    ["13"],
    ["14"],
    ["15"],
  ];
  await validateGridContents(tbody, expectedThirdPageContents);

  await container
    .locator('select[aria-label="Number of Rows per Page"]')
    .selectOption("2");
  await expect(container.locator('tr[data-rowindex="14"]')).toBeVisible();
  await expect(container.locator('tr[data-rowindex="0"]')).toBeVisible();
  const expectedFullPageContents: string[][] = [
    ["1"],
    ["2"],
    ["3"],
    ["4"],
    ["5"],
    ["6"],
    ["7"],
    ["8"],
    ["9"],
    ["10"],
    ["11"],
    ["12"],
    ["13"],
    ["14"],
    ["15"],
  ];
  await validateGridContents(tbody, expectedFullPageContents);
  const activeLi = container.locator('li[aria-current="page"]');
  await expect(activeLi).toHaveClass("page-item active");
  await expect(activeLi.getByRole("link", { name: "1" })).toBeVisible();
})

test("first and last buttons work correctly", async ({ page }) => {
  const container = page.getByTestId("edge button test container");
  const gridTable = container.locator('table[aria-rowcount="16"]');

  const tbody = gridTable.locator("tbody");

  const expectedInitialContents: string[][] = [
    ["1"],
    ["2"],
    ["3"],
  ];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("link", { name: "Last" }).click();
  await expect(container.locator('tr[data-rowindex="14"]')).toBeVisible();
  const expectedLastPageContents: string[][] = [["13"], ["14"], ["15"]];
  await validateGridContents(tbody, expectedLastPageContents);

  await container.getByRole("link", { name: "First" }).click();
  await expect(container.locator('tr[data-rowindex="0"]')).toBeVisible();
  await validateGridContents(tbody, expectedInitialContents);
})