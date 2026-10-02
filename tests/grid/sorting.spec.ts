import { expect, Page, test } from "@playwright/test";
import { validateGridContents } from "../util";

const INITIAL_FORMATTED_ROWS = [
  ["5th row string", "1", "1772496000000", "2026-04-04T04:04"],
  ["4th row string", "2", "1777939200000", "2026-03-03T03:03"],
  ["3rd row string", "3", "1767225600000", "2026-01-01T01:01"],
  ["2nd row string", "4", "1769990400000", "2026-05-05T05:05"],
  ["1st row string", "5", "1775260800000", "2026-02-02T02:02"],
];

const REVERSED_ROWS = INITIAL_FORMATTED_ROWS.slice().reverse();

const DATE_ASC_ROWS = [2, 3, 0, 4, 1].map(
  (initIndex) => INITIAL_FORMATTED_ROWS[initIndex],
);
const DATE_DESC_ROWS = DATE_ASC_ROWS.slice().reverse();
const DATETIME_ASC_ROWS = [2, 4, 1, 0, 3].map(
  (initIndex) => INITIAL_FORMATTED_ROWS[initIndex],
);
const DATETIME_DESC_ROWS = DATETIME_ASC_ROWS.slice().reverse();

const validateContents: (
  page: Page,
  contents: string[][],
) => Promise<void> = async (page, contents) => {
  const bodyDiv = page.getByTestId("rbdg-body-rowgroup");

  await validateGridContents(bodyDiv, contents, 0, 0, "gridcell");
};

const verifyColumnSorting: (
  page: Page,
  colLabel: string,
  expectedAsc: string[][],
  expectedDesc: string[][],
) => Promise<void> = async (page, colLabel, expectedAsc, expectedDesc) => {
  const colButton = page.getByRole("button", { name: colLabel });
  const colHeader = page.getByRole("columnheader", {
    name: colLabel,
  });

  await expect(colHeader).not.toHaveAttribute("aria-sort");

  await colButton.click();
  await expect(colHeader).toHaveAttribute("aria-sort", "ascending");
  await validateContents(page, expectedAsc);

  await colButton.click();
  await expect(colHeader).toHaveAttribute("aria-sort", "descending");
  await validateContents(page, expectedDesc);

  await colButton.click();
  await expect(colHeader).not.toHaveAttribute("aria-sort");
  await validateContents(page, INITIAL_FORMATTED_ROWS);
};

test.beforeEach(async ({ page }) => {
  await page.goto("grid/sorting");
});

test("Unsorted grid should display rows in initial order", async ({ page }) => {
  await validateContents(page, INITIAL_FORMATTED_ROWS);
});

test("String column sorting should work", async ({ page }) => {
  await verifyColumnSorting(
    page,
    "String Column",
    REVERSED_ROWS,
    INITIAL_FORMATTED_ROWS,
  );
});

test("Number column sorting should work", async ({ page }) => {
  await verifyColumnSorting(
    page,
    "Number Column",
    INITIAL_FORMATTED_ROWS,
    REVERSED_ROWS,
  );
});

test("Date column sorting should work", async ({ page }) => {
  await verifyColumnSorting(page, "Date Column", DATE_ASC_ROWS, DATE_DESC_ROWS);
});

test("Datetime column sorting should work", async ({ page }) => {
  await verifyColumnSorting(
    page,
    "Datetime Column",
    DATETIME_ASC_ROWS,
    DATETIME_DESC_ROWS,
  );
});
