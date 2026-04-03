import { test } from "@playwright/test";
import { confirmColWidth } from "../util";

test.beforeEach(async ({ page }) => {
  await page.goto("/pro/resize");
});

test("resize and min and max widths work correctly", async ({ page }) => {
  const table = page.getByRole("table");
  const datetimeHeaderCell = page.getByRole("columnheader", {
    name: "Datetime Column",
  });
  const dragHandle = datetimeHeaderCell.getByRole("separator");

  const rightDragTarget = page.getByTestId("rightDragTarget");
  await dragHandle.dragTo(rightDragTarget);
  await confirmColWidth(300, 1, 4, table);

  const leftDragTarget = page.getByTestId("leftDragTarget");
  await dragHandle.dragTo(leftDragTarget);
  await confirmColWidth(150, 1, 4, table);
});

test("resize works properly with controlled width state and no limits", async ({
  page,
}) => {
  const table = page.getByRole("table");
  const dateHeaderCell = page.getByRole("columnheader", {
    name: "Date Column",
  });
  const dragHandle = dateHeaderCell.getByRole("separator");

  const rightDragTarget = page.getByTestId("rightDragTarget");
  await dragHandle.dragTo(rightDragTarget);
  await confirmColWidth(525, 10, 3, table);

  const leftDragTarget = page.getByTestId("leftDragTarget");
  await dragHandle.dragTo(leftDragTarget);
  await confirmColWidth(125, 10, 3, table);
});

test("pressing escape key cancels a resize in progress", async ({ page }) => {
  const table = page.getByRole("table");
  const strHeaderCell = page.getByRole("columnheader", {
    name: "String Column",
  });
  const dragHandle = strHeaderCell.getByRole("separator");
  const leftDragTarget = page.getByTestId("leftDragTarget");

  await dragHandle.hover();
  await page.mouse.down();
  await leftDragTarget.hover();
  await page.keyboard.press("Escape");
  await page.mouse.up();

  await confirmColWidth(100, 1, 1, table);
});

test("keyboard resizing works and obeys limits", async ({ page }) => {
  const table = page.getByRole("table");

  // focus on datetime column header separator
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");

  await page.keyboard.press("ArrowRight");
  await confirmColWidth(250, 1, 4, table);
  await page.keyboard.press("ArrowRight");
  await confirmColWidth(300, 1, 4, table);

  await page.keyboard.press("ArrowLeft");
  await confirmColWidth(200, 1, 4, table);
  await page.keyboard.press("ArrowLeft");
  await confirmColWidth(150, 1, 4, table);
});
