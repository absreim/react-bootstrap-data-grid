import { expect, Page, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

const defaultBgColor = "rgb(255, 255, 255)";
const primaryBgColor = "rgb(207, 226, 255)";
const successBgColor = "rgb(209, 231, 221)";
const dangerBgColor = "rgb(248, 215, 218)";
const infoBgColor = "rgb(207, 244, 252)";
const secondaryBgColor = "rgb(226, 227, 229)";
const brandBgColor = "rgb(227, 213, 254)";

const enableBodyRowVariants = async (page: Page) => {
  const bodyRowVariantsSwitch = page.getByRole("checkbox", {
    name: "Body Row Variants",
  });
  await bodyRowVariantsSwitch.click();
};

const enableBodyCellVariants = async (page: Page) => {
  const bodyCellVariantsSwitch = page.getByRole("checkbox", {
    name: "Body Cell Variants",
  });
  await bodyCellVariantsSwitch.click();
};

const assertBodyCellVariants = async (
  page: Page,
  expectedColors: Record<"firstRow" | "secondRow", string>,
) => {
  const firstColCells = await page
    .locator('div[aria-colindex="1"][role="gridcell"]')
    .all();

  const firstRowNumCell = page.locator(
    'div[aria-rowindex="2"] > div[aria-colindex="2"]',
  );
  const otherFirstRowCells = await page
    .locator('div[aria-rowindex="2"] > div:nth-child(n+3)')
    .all();

  const otherSecondRowCells = await page
    .locator('div[aria-rowindex="3"] > div:not(:first-child)')
    .all();

  const otherThirdRowCells = await page
    .locator('div[aria-rowindex="4"] > div:not(:first-child)')
    .all();

  const otherFourthRowCells = await page
    .locator('div[aria-rowindex="5"] > div:not(:first-child)')
    .all();

  expect(firstColCells).toHaveLength(10);
  for (const cell of firstColCells) {
    await expect(cell).toHaveCSS("background-color", secondaryBgColor);
  }

  await expect(firstRowNumCell).toHaveCSS("background-color", dangerBgColor);

  expect(otherFirstRowCells).toHaveLength(2);
  for (const cell of otherFirstRowCells) {
    await expect(cell).toHaveCSS(
      "background-color",
      expectedColors["firstRow"],
    );
  }

  expect(otherSecondRowCells).toHaveLength(3);
  for (const cell of otherSecondRowCells) {
    await expect(cell).toHaveCSS(
      "background-color",
      expectedColors["secondRow"],
    );
  }

  expect(otherThirdRowCells).toHaveLength(3);
  for (const cell of otherThirdRowCells) {
    await expect(cell).toHaveCSS("background-color", infoBgColor);
  }

  expect(otherFourthRowCells).toHaveLength(3);
  for (const cell of otherFourthRowCells) {
    await expect(cell).toHaveCSS("background-color", successBgColor);
  }
};

test("Body row variants work correctly", async ({ page }) => {
  await enableBodyRowVariants(page);

  const firstBodyRowCells = await page
    .locator('div[aria-rowindex="2"] > div')
    .all();
  const secondBodyRowCells = await page
    .locator('div[aria-rowindex="3"] > div')
    .all();
  const thirdBodyRowCells = await page
    .locator('div[aria-rowindex="4"] > div')
    .all();

  expect(firstBodyRowCells).toHaveLength(4);
  for (const cell of firstBodyRowCells) {
    await expect(cell).toHaveCSS("background-color", brandBgColor);
  }

  expect(secondBodyRowCells).toHaveLength(4);
  for (const cell of secondBodyRowCells) {
    await expect(cell).toHaveCSS("background-color", primaryBgColor);
  }

  expect(thirdBodyRowCells).toHaveLength(4);
  for (const cell of thirdBodyRowCells) {
    await expect(cell).toHaveCSS("background-color", dangerBgColor);
  }
});

test("Body cell variants work correctly", async ({ page }) => {
  await enableBodyCellVariants(page);

  await assertBodyCellVariants(page, {
    firstRow: defaultBgColor,
    secondRow: defaultBgColor,
  });
});

test("Body cell variants override row variants correctly", async ({ page }) => {
  await enableBodyRowVariants(page);
  await enableBodyCellVariants(page);

  await assertBodyCellVariants(page, {
    firstRow: brandBgColor,
    secondRow: primaryBgColor,
  });
});
