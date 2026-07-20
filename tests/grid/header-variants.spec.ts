import { expect, Page, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

const defaultBgColor = "rgb(255, 255, 255)";
const primaryBgColor = "rgb(207, 226, 255)";
const warningBgColor = "rgb(255, 243, 205)";
const successBgColor = "rgb(209, 231, 221)";

const selectPrimaryHeaderRowVariant = async (page: Page) => {
  const headerRowDropdown = page.getByRole("combobox", {
    name: "Select header row variant",
  });
  await headerRowDropdown.selectOption("primary");
};

const enableHeaderCellVariants = async (page: Page) => {
  const headerCellVariantSwitch = page.getByRole("checkbox", {
    name: "Header Cell Variants",
  });
  await headerCellVariantSwitch.check();
};

const assertHeaderCellBgColors = async (
  page: Page,
  colorByCell: Record<"str" | "num" | "date" | "datetime", string>,
) => {
  const strColHeaderCell = page.getByRole("columnheader", {
    name: "String Column",
  });
  const numColHeaderCell = page.getByRole("columnheader", {
    name: "Number Column",
  });
  const dateColHeaderCell = page.getByRole("columnheader", {
    name: "Date Column",
  });
  const datetimeColHeaderCell = page.getByRole("columnheader", {
    name: "Datetime Column",
  });

  await expect(strColHeaderCell).toHaveCSS(
    "background-color",
    colorByCell["str"],
  );
  await expect(numColHeaderCell).toHaveCSS(
    "background-color",
    colorByCell["num"],
  );
  await expect(dateColHeaderCell).toHaveCSS(
    "background-color",
    colorByCell["date"],
  );
  await expect(datetimeColHeaderCell).toHaveCSS(
    "background-color",
    colorByCell["datetime"],
  );
};

test("Header row variant setting works correctly", async ({ page }) => {
  await selectPrimaryHeaderRowVariant(page);

  const headerCells = await page.getByRole("columnheader").all();

  expect(headerCells).toHaveLength(4);
  for (const headerCell of headerCells) {
    await expect(headerCell).toHaveCSS("background-color", primaryBgColor);
  }
});

test("Header cell variant prop works correctly", async ({ page }) => {
  await enableHeaderCellVariants(page);

  await assertHeaderCellBgColors(page, {
    str: warningBgColor,
    num: defaultBgColor,
    date: successBgColor,
    datetime: successBgColor,
  });
});

test("Header cell prop function overrides header row color for non-null outputs", async ({
  page,
}) => {
  await selectPrimaryHeaderRowVariant(page);
  await enableHeaderCellVariants(page);

  await assertHeaderCellBgColors(page, {
    str: warningBgColor,
    num: primaryBgColor,
    date: successBgColor,
    datetime: successBgColor,
  });
});
