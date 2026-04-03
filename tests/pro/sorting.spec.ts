import { expect, test } from "@playwright/test";
import { confirmColWidth, validateGridContents } from "../util";

test.beforeEach(async ({ page }) => {
  await page.goto("/pro/sorting");
});

test("sorting still works even if resizing is enabled", async ({ page }) => {
  const tbody = page.locator("tbody");
  await validateGridContents(tbody, [["1"], ["3"], ["2"]]);
  await page.getByText("Resizeable Sortable Column").click();

  await expect(
    page.getByRole("img", { name: "(sorted ascending)" }),
  ).toBeVisible();
  await validateGridContents(tbody, [["1"], ["2"], ["3"]]);
  await page.getByText("Resizeable Sortable Column").click();

  await expect(
    page.getByRole("img", { name: "(sorted descending)" }),
  ).toBeVisible();
  await validateGridContents(tbody, [["3"], ["2"], ["1"]]);
  await page.getByText("Resizeable Sortable Column").click();

  await expect(
    page.locator('tr[aria-rowindex="3"][data-rowid="3"]'),
  ).toBeVisible();
  await validateGridContents(tbody, [["1"], ["3"], ["2"]]);
});

test("using the resize handle does not cause the sort order to change", async ({ page }) => {
  const headerCell = page.getByRole("columnheader", {
    name: "Resizeable Sortable Column",
  });
  const dragHandle = headerCell.getByRole("separator");

  const rightDragTarget = page.getByTestId("dragTarget");
  await dragHandle.dragTo(rightDragTarget);

  const table = page.getByRole("table");
  await confirmColWidth(300, 1, 1, table);

  const tbody = page.locator("tbody");
  await validateGridContents(tbody, [["1"], ["3"], ["2"]]);
});
