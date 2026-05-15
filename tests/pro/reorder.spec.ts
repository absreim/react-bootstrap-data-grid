import { expect, test } from "@playwright/test";
import { validateGridContents } from "../util";

test.beforeEach(async ({ page }) => {
  await page.goto("/pro/reorder");
})

test("dragging to the lower half of a row works correctly", async ({ page }) => {
  const dragButton2 = page.getByRole("button", { name: "Reorder Row 2" });
  const dragTarget = page.getByTestId("drag-target-y-lower");
  await dragButton2.dragTo(dragTarget);

  const tbody = page.locator("tbody");
  await validateGridContents(tbody, [
    ["Second Row", "2", "2026-01-02", "2026-01-02T02:00"],
    ["First Row", "1", "2026-01-01", "2026-01-01T01:00"],
    ["Third Row", "3", "2026-01-03", "2026-01-03T03:00"],
  ]);
});

test("dragging to the upper half of a row works correctly", async ({
  page,
}) => {
  const dragButton2 = page.getByRole("button", { name: "Reorder Row 2" });
  const dragTarget = page.getByTestId("drag-target-z-upper");
  await dragButton2.dragTo(dragTarget);

  const tbody = page.locator("tbody");
  await validateGridContents(tbody, [
    ["Second Row", "2", "2026-01-02", "2026-01-02T02:00"],
    ["First Row", "1", "2026-01-01", "2026-01-01T01:00"],
    ["Third Row", "3", "2026-01-03", "2026-01-03T03:00"],
  ]);
});

test("dragging to the right below the head works correctly", async ({
  page,
}) => {
  const dragButton4 = page.getByRole("button", { name: "Reorder Row 4" });
  const dragTarget = page.getByTestId("drag-target-x-upper");
  await dragButton4.dragTo(dragTarget);

  const tbody = page.locator("tbody");
  await validateGridContents(tbody, [
    ["Third Row", "3", "2026-01-03", "2026-01-03T03:00"],
    ["First Row", "1", "2026-01-01", "2026-01-01T01:00"],
    ["Second Row", "2", "2026-01-02", "2026-01-02T02:00"],
  ]);
});

test("dragging to the right above the grid bottom border works correctly", async ({
  page,
}) => {
  const dragButton2 = page.getByRole("button", { name: "Reorder Row 2" });
  const dragTarget = page.getByTestId("drag-target-z-lower");
  await dragButton2.dragTo(dragTarget);

  const tbody = page.locator("tbody");
  await validateGridContents(tbody, [
    ["Second Row", "2", "2026-01-02", "2026-01-02T02:00"],
    ["Third Row", "3", "2026-01-03", "2026-01-03T03:00"],
    ["First Row", "1", "2026-01-01", "2026-01-01T01:00"],
  ]);
});

test("top row dragee styles work properly", async ({ page }) => {
  const dragButton2 = page.getByRole("button", { name: "Reorder Row 2" });
  await dragButton2.hover();
  await page.mouse.down();

  const headerRow = page.locator("thead > tr");
  await expect(headerRow).toContainClass("rbdg-reorder-dragged-row-pred");
  const firstDataRow = page.locator('tr[aria-rowindex="2"]');
  await expect(firstDataRow).toContainClass("rbdg-reorder-dragged-row");

  const secondDataRowLowerPart = page.getByTestId("drag-target-y-lower");
  await secondDataRowLowerPart.hover({ force: true });
  const secondDataRow = page.locator('tr[aria-rowindex="3"]');
  const thirdDataRow = page.locator('tr[aria-rowindex="4"]');

  await expect(secondDataRow).toContainClass("reorder-above-drag-target-row");
  await expect(thirdDataRow).toContainClass("reorder-below-drag-target-row");

  const thirdDataRowLowerPart = page.getByTestId("drag-target-z-lower");
  await thirdDataRowLowerPart.hover({ force: true });

  await expect(thirdDataRow).toContainClass("reorder-above-drag-target-row");
});

test("middle row dragee styles work properly", async ({ page }) => {
  const dragButton3 = page.getByRole("button", { name: "Reorder Row 3" });
  await dragButton3.hover();
  await page.mouse.down();

  const firstDataRow = page.locator('tr[aria-rowindex="2"]');
  const secondDataRow = page.locator('tr[aria-rowindex="3"]');
  await expect(firstDataRow).toContainClass("rbdg-reorder-dragged-row-pred");
  await expect(secondDataRow).toContainClass("rbdg-reorder-dragged-row");

  const firstDataRowUpperPart = page.getByTestId("drag-target-x-upper");
  await firstDataRowUpperPart.hover({ force: true });

  const headerRow = page.locator("thead > tr");
  await expect(headerRow).toContainClass("reorder-above-drag-target-row");
  await expect(firstDataRow).toContainClass("reorder-below-drag-target-row");
});

test("bottom row dragee styles work properly", async ({ page }) => {
  const dragButton4 = page.getByRole("button", { name: "Reorder Row 4" });
  await dragButton4.hover();
  await page.mouse.down();

  const secondDataRow = page.locator('tr[aria-rowindex="3"]');
  const thirdDataRow = page.locator('tr[aria-rowindex="4"]');
  await expect(secondDataRow).toContainClass("rbdg-reorder-dragged-row-pred");
  await expect(thirdDataRow).toContainClass("rbdg-reorder-dragged-row");

  const firstDataRowLowerPart = page.getByTestId("drag-target-x-lower");
  await firstDataRowLowerPart.hover({ force: true });
  const firstDataRow = page.locator('tr[aria-rowindex="2"]');

  await expect(firstDataRow).toContainClass("reorder-above-drag-target-row");
  await expect(secondDataRow).toContainClass("reorder-below-drag-target-row");
});
