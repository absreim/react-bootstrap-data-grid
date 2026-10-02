import { test } from "@playwright/test";
import { validateGridContents } from "../util";

const INITIAL_FORMATTED_ROWS = [
  ["3rd row string", "3", "1772496000000", "2026-03-03T03:03"],
  ["2nd row string", "2", "1769990400000", "2026-02-02T02:02"],
  ["5th row string", "5", "1777939200000", "2026-05-05T05:05"],
  ["1st row string", "1", "1767225600000", "2026-01-01T01:01"],
  ["4th row string", "4", "1775260800000", "2026-04-04T04:04"],
];

test.beforeEach(async ({ page }) => {
  await page.goto("grid/sorting");
});

test("Unsorted grid should display rows in initial order", async ({ page }) => {
  const bodyDiv = page.getByTestId("rbdg-body-rowgroup");

  await validateGridContents(bodyDiv, INITIAL_FORMATTED_ROWS, 0, 0, "gridcell");
});
