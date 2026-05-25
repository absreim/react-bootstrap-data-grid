import { expect, Page, test } from "@playwright/test";
import { validateGridContents } from "../util";

test.beforeEach(async ({ page }) => {
  await page.goto("pro/reorder");
});

const tabToFirstReorderButton: (page: Page) => Promise<void> = async (page) => {
  await page.keyboard.press("Tab");
  const filterToolbarButton = page.getByRole("button", { name: "Filtering" });
  await expect(filterToolbarButton).toBeFocused();

  const deselectAllCheckbox = page.getByRole("checkbox", {
    name: "Deselect all rows",
  });
  await page.keyboard.press("Tab");
  await expect(deselectAllCheckbox).toBeFocused();

  const row2Button = page.getByRole("button", { name: "Reorder Row 2" });
  await page.keyboard.press("Tab");
  await expect(row2Button).toBeFocused();
};

const tableToSecondReorderButton: (page: Page) => Promise<void> = async (
  page,
) => {
  await tabToFirstReorderButton(page);

  const row2Select = page.getByRole("checkbox", {
    name: "Select row with index 0",
  });
  await page.keyboard.press("Tab");
  await expect(row2Select).toBeFocused();

  const row3Button = page.getByRole("button", { name: "Reorder Row 3" });
  await page.keyboard.press("Tab");
  await expect(row3Button).toBeFocused();
};

test("Reorder from first row works properly", async ({ page }) => {
  await tabToFirstReorderButton(page);

  await page.keyboard.press("Enter");

  const xRow = page.locator('tr[data-rowid="x"]');
  await expect(xRow).toHaveAttribute("aria-selected", "true");
  await expect(xRow).toHaveClass("table-active rbdg-reorder-dragged-row");

  const headerRow = page.locator("thead > tr");
  await expect(headerRow).toHaveClass("rbdg-reorder-dragged-row-pred");

  const yRow = page.locator('tr[data-rowid="y"]');
  await expect(yRow).toHaveClass("rbdg-reorder-above-drag-target-row");

  const zRow = page.locator('tr[data-rowid="z"]');
  await expect(zRow).toHaveClass("rbdg-reorder-below-drag-target-row");

  await page.keyboard.press("ArrowDown");

  await expect(zRow).toHaveClass("rbdg-reorder-above-drag-target-row");

  await page.keyboard.press("ArrowDown");

  await expect(yRow).toHaveClass("rbdg-reorder-above-drag-target-row");
  await expect(zRow).toHaveClass("rbdg-reorder-below-drag-target-row");

  await page.keyboard.press("ArrowUp");

  await expect(zRow).toHaveClass("rbdg-reorder-above-drag-target-row");

  await page.keyboard.press("ArrowUp");

  await expect(yRow).toHaveClass("rbdg-reorder-above-drag-target-row");
  await expect(zRow).toHaveClass("rbdg-reorder-below-drag-target-row");

  await page.keyboard.press("Space");

  const tbody = page.locator("tbody");
  await validateGridContents(
    tbody,
    [
      ["Second Row", "2", "2026-01-02", "2026-01-02T02:00"],
      ["First Row", "1", "2026-01-01", "2026-01-01T01:00"],
      ["Third Row", "3", "2026-01-03", "2026-01-03T03:00"],
    ],
    0,
    2,
  );
});

test("Reorder from middle row works properly", async ({ page }) => {
  await tableToSecondReorderButton(page);

  await page.keyboard.press("Space");

  const xRow = page.locator('tr[data-rowid="x"]');
  await expect(xRow).toHaveClass("table-active rbdg-reorder-dragged-row-pred");
  await expect(xRow).toHaveAttribute("aria-selected", "true");

  const yRow = page.locator('tr[data-rowid="y"]');
  await expect(yRow).toHaveClass("rbdg-reorder-dragged-row");

  const zRow = page.locator('tr[data-rowid="z"]');
  await expect(zRow).toHaveClass("rbdg-reorder-above-drag-target-row");

  await page.keyboard.press("ArrowDown");

  const headerRow = page.locator("thead > tr");
  await expect(headerRow).toHaveClass("rbdg-reorder-above-drag-target-row");
  await expect(xRow).toHaveClass(
    "table-active rbdg-reorder-dragged-row-pred rbdg-reorder-below-drag-target-row",
  );

  await page.keyboard.press("ArrowDown");

  await expect(zRow).toHaveClass("rbdg-reorder-above-drag-target-row");
  await expect(xRow).toHaveClass("table-active rbdg-reorder-dragged-row-pred");

  await page.keyboard.press("ArrowUp");

  await expect(headerRow).toHaveClass("rbdg-reorder-above-drag-target-row");
  await expect(xRow).toHaveClass(
    "table-active rbdg-reorder-dragged-row-pred rbdg-reorder-below-drag-target-row",
  );

  await page.keyboard.press("ArrowUp");

  await expect(zRow).toHaveClass("rbdg-reorder-above-drag-target-row");
  await expect(xRow).toHaveClass("table-active rbdg-reorder-dragged-row-pred");

  await page.keyboard.press("Enter");

  const tbody = page.locator("tbody");
  await validateGridContents(
    tbody,
    [
      ["First Row", "1", "2026-01-01", "2026-01-01T01:00"],
      ["Third Row", "3", "2026-01-03", "2026-01-03T03:00"],
      ["Second Row", "2", "2026-01-02", "2026-01-02T02:00"],
    ],
    0,
    2,
  );
});

test("Reorder from last row works properly", async ({ page }) => {
  await tableToSecondReorderButton(page);

  const row3Select = page.getByRole("checkbox", {
    name: "Select row with index 1",
  });
  await page.keyboard.press("Tab");
  await expect(row3Select).toBeFocused();

  const row4Button = page.getByRole("button", { name: "Reorder Row 4" });
  await page.keyboard.press("Tab");
  await expect(row4Button).toBeFocused();

  await page.keyboard.press("Enter");

  const yRow = page.locator('tr[data-rowid="y"]');
  await expect(yRow).toHaveClass("rbdg-reorder-dragged-row-pred");

  const zRow = page.locator('tr[data-rowid="z"]');
  await expect(zRow).toHaveClass("rbdg-reorder-dragged-row");

  const xRow = page.locator('tr[data-rowid="x"]');
  await expect(xRow).toHaveClass(
    "table-active rbdg-reorder-above-drag-target-row",
  );

  await page.keyboard.press("ArrowDown");

  const headerRow = page.locator("thead > tr");
  await expect(headerRow).toHaveClass("rbdg-reorder-above-drag-target-row");
  await expect(xRow).toHaveClass(
    "table-active rbdg-reorder-below-drag-target-row",
  );

  await page.keyboard.press("ArrowDown");

  await expect(xRow).toHaveClass(
    "table-active rbdg-reorder-above-drag-target-row",
  );

  await page.keyboard.press("ArrowUp");

  await expect(headerRow).toHaveClass("rbdg-reorder-above-drag-target-row");
  await expect(xRow).toHaveClass(
    "table-active rbdg-reorder-below-drag-target-row",
  );

  await page.keyboard.press("ArrowUp");

  await expect(xRow).toHaveClass(
    "table-active rbdg-reorder-above-drag-target-row",
  );

  await page.keyboard.press("Enter");

  const tbody = page.locator("tbody");
  await validateGridContents(
    tbody,
    [
      ["First Row", "1", "2026-01-01", "2026-01-01T01:00"],
      ["Third Row", "3", "2026-01-03", "2026-01-03T03:00"],
      ["Second Row", "2", "2026-01-02", "2026-01-02T02:00"],
    ],
    0,
    2,
  );
});

test("Cancelling with Esc key works properly", async ({ page }) => {
  await tabToFirstReorderButton(page);

  await page.keyboard.press("Enter");

  const xRow = page.locator('tr[data-rowid="x"]');
  await expect(xRow).toHaveAttribute("aria-selected", "true");
  await expect(xRow).toHaveClass("table-active rbdg-reorder-dragged-row");

  const headerRow = page.locator("thead > tr");
  await expect(headerRow).toHaveClass("rbdg-reorder-dragged-row-pred");

  const yRow = page.locator('tr[data-rowid="y"]');
  await expect(yRow).toHaveClass("rbdg-reorder-above-drag-target-row");

  const zRow = page.locator('tr[data-rowid="z"]');
  await expect(zRow).toHaveClass("rbdg-reorder-below-drag-target-row");

  await page.keyboard.press("Escape");

  await expect(xRow).toHaveClass("table-active");
  await expect(headerRow).toHaveClass("");
  await expect(yRow).toHaveClass("");
  await expect(zRow).toHaveClass("");
});
