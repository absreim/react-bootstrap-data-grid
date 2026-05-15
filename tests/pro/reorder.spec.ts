import { test } from "@playwright/test";
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
