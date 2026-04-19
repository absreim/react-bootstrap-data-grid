import { test, Locator, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/pro/resize");
});

const confirmColWidth: (width: number, ariaColIndex: number, container: Locator) => Promise<void> = async (width, ariaColIndex, container) => {
  const cells = await container.locator(`[aria-colindex="${ariaColIndex}"]`).all();
  for (const cell of cells) {
    expect(await cell.getAttribute("style")).toBe(
      `min-width: ${width}px; max-width: ${width}px;`,
    );
  }
}

test("resize and min and max widths work correctly", async ({ page }) => {
  const table = page.getByRole("table");
  const datetimeCol = page.getByRole("columnheader", {
    name: "Datetime Column",
  });
  const dragHandle = datetimeCol.getByRole("separator");
  const rightDragTarget = page.getByTestId("rightDragTarget");
  await dragHandle.dragTo(rightDragTarget);
  await confirmColWidth(300, 4, table);

  const leftDragTarget = page.getByTestId("leftDragTarget");
  await dragHandle.dragTo(leftDragTarget);
  await confirmColWidth(150, 4, table);
});
