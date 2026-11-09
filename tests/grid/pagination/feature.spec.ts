import { generateBasicTestRows } from "../../../src/test-tools/basic-test-data";
import { dateToDatetimeInputStr } from "../../../src/common";
import { test } from "@playwright/test";
import { validateGridContents } from "../../util";
import { pageSizeSelectorLabel } from "../../constants";

const getTestContentDisplayRows: (numRows: number) => string[][] = (numRows) =>
  generateBasicTestRows(numRows).map(
    ({ data: { strCol, numCol, date, datetime } }) => [
      strCol,
      String(numCol),
      String(date.valueOf()),
      dateToDatetimeInputStr(datetime),
    ],
  );

const testDisplayRows = getTestContentDisplayRows(25);

test.beforeEach(async ({ page }) => {
  await page.goto("grid/pagination");
})

test("pagination works correctly with numeric buttons", async ({ page }) => {
  const page3Link = page.getByRole("link", { name: "3" });
  await page3Link.click();

  const bodyElem = page.getByTestId("rbdg-body-rowgroup");
  await validateGridContents(
    bodyElem,
    testDisplayRows.slice(10, 15),
    10,
    0,
    "gridcell",
  );

  const page5Link = page.getByRole("link", { name: "5" });
  await page5Link.click();

  await validateGridContents(
    bodyElem,
    testDisplayRows.slice(20, 25),
    20,
    0,
    "gridcell",
  );
});

test("pagination works correctly with arrow buttons", async ({ page }) => {
  const nextLink = page.getByRole("link", { name: "Next" });
  await nextLink.click();

  const bodyElem = page.getByTestId("rbdg-body-rowgroup");
  await validateGridContents(
    bodyElem,
    testDisplayRows.slice(5, 10),
    5,
    0,
    "gridcell",
  );

  const prevLink = page.getByRole("link", { name: "Previous" });
  await prevLink.click();

  await validateGridContents(
    bodyElem,
    testDisplayRows.slice(0, 5),
    0,
    0,
    "gridcell",
  );
});

test("page size selection tries preserves page index if possible", async ({ page }) => {
  const page2Link = page.getByRole("link", { name: "2" });
  await page2Link.click();

  const pageSizeSelector = page.getByRole("combobox", { name: pageSizeSelectorLabel });
  await pageSizeSelector.selectOption({ label: "10" });

  const bodyElem = page.getByTestId("rbdg-body-rowgroup");
  await validateGridContents(
    bodyElem,
    testDisplayRows.slice(10, 20),
    10,
    0,
    "gridcell",
  );
});

test("page size selection corrects for indices that are out of bounds", async ({ page }) => {
  const page4Link = page.getByRole("link", { name: "4" });
  await page4Link.click();

  const pageSizeSelector = page.getByRole("combobox", {
    name: pageSizeSelectorLabel
  });
  await pageSizeSelector.selectOption({ label: "10" });

  const bodyElem = page.getByTestId("rbdg-body-rowgroup");
  await validateGridContents(
    bodyElem,
    testDisplayRows.slice(20, 25),
    20,
    0,
    "gridcell",
  );
});
