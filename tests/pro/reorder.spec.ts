import { expect, Page, test } from "@playwright/test";
import { validateGridContents } from "../util";

test.beforeEach(async ({ page }) => {
  await page.goto("/pro/reorder");
});

test("dragging to the lower half of a row works correctly", async ({
  page,
}) => {
  const dragButton2 = page.getByRole("button", { name: "Reorder Row 2" });
  const dragTarget = page.getByTestId("drag-target-y-lower");
  await dragButton2.dragTo(dragTarget);

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

  const xRow = page.locator('tr[data-rowid="x"]');
  await expect(xRow).toHaveAttribute("aria-selected", "true");
});

test("dragging to the upper half of a row works correctly", async ({
  page,
}) => {
  const dragButton2 = page.getByRole("button", { name: "Reorder Row 2" });
  const dragTarget = page.getByTestId("drag-target-z-upper");
  await dragButton2.dragTo(dragTarget);

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

  const xRow = page.locator('tr[data-rowid="x"]');
  await expect(xRow).toHaveAttribute("aria-selected", "true");
});

test("dragging to the right below the head works correctly", async ({
  page,
}) => {
  const dragButton4 = page.getByRole("button", { name: "Reorder Row 4" });
  const dragTarget = page.getByTestId("drag-target-x-upper");
  await dragButton4.dragTo(dragTarget);

  const tbody = page.locator("tbody");
  await validateGridContents(
    tbody,
    [
      ["Third Row", "3", "2026-01-03", "2026-01-03T03:00"],
      ["First Row", "1", "2026-01-01", "2026-01-01T01:00"],
      ["Second Row", "2", "2026-01-02", "2026-01-02T02:00"],
    ],
    0,
    2,
  );

  const zRow = page.locator('tr[data-rowid="z"]');
  await expect(zRow).toHaveAttribute("aria-selected", "false");
});

test("dragging to the right above the grid bottom border works correctly", async ({
  page,
}) => {
  const dragButton2 = page.getByRole("button", { name: "Reorder Row 2" });
  const dragTarget = page.getByTestId("drag-target-z-lower");
  await dragButton2.dragTo(dragTarget);

  const tbody = page.locator("tbody");
  await validateGridContents(
    tbody,
    [
      ["Second Row", "2", "2026-01-02", "2026-01-02T02:00"],
      ["Third Row", "3", "2026-01-03", "2026-01-03T03:00"],
      ["First Row", "1", "2026-01-01", "2026-01-01T01:00"],
    ],
    0,
    2,
  );

  const xRow = page.locator('tr[data-rowid="x"]');
  await expect(xRow).toHaveAttribute("aria-selected", "true");
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

  await expect(secondDataRow).toContainClass(
    "rbdg-reorder-above-drag-target-row",
  );
  await expect(thirdDataRow).toContainClass(
    "rbdg-reorder-below-drag-target-row",
  );

  const thirdDataRowLowerPart = page.getByTestId("drag-target-z-lower");
  await thirdDataRowLowerPart.hover({ force: true });

  await expect(thirdDataRow).toContainClass(
    "rbdg-reorder-above-drag-target-row",
  );
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
  await expect(headerRow).toContainClass("rbdg-reorder-above-drag-target-row");
  await expect(firstDataRow).toContainClass(
    "rbdg-reorder-below-drag-target-row",
  );
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

  await expect(firstDataRow).toContainClass(
    "rbdg-reorder-above-drag-target-row",
  );
  await expect(secondDataRow).toContainClass(
    "rbdg-reorder-below-drag-target-row",
  );
});

const checkDragBtnsEnablement: (
  page: Page,
  enabled: boolean,
) => Promise<void> = async (page, enabled) => {
  const buttonNames = ["Reorder Row 2", "Reorder Row 3", "Reorder Row 4"];
  for (const buttonName of buttonNames) {
    const button = page.getByRole("button", { name: buttonName });
    if (enabled) {
      await expect(button).toBeEnabled();
      continue;
    }

    await expect(button).toBeDisabled();
  }
};

test("drag buttons are disabled if sorting is occurring", async ({ page }) => {
  const unsortedStrColHeader = page.getByRole("columnheader", {
    name: "String Column(not being sorted)",
    exact: true,
  });
  await unsortedStrColHeader.click();

  await checkDragBtnsEnablement(page, false);
});

test("drag buttons are disabled if filtering is occurring", async ({
  page,
}) => {
  const filterToolbarButton = page.getByRole("button", { name: "Filtering" });
  await filterToolbarButton.click();

  const stringFilterCheckbox = page.getByRole("checkbox", {
    name: "String Column Column Filter Toggle",
  });
  await stringFilterCheckbox.check();

  const stringFilterInput = page.getByRole("textbox", {
    name: "String Column Column Filter Value",
  });
  await stringFilterInput.fill("Row");

  const submitButton = page.getByRole("button", { name: "Submit" });
  await submitButton.click();
  await filterToolbarButton.click();

  await checkDragBtnsEnablement(page, false);
});
