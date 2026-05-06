import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/pro/reorder/styling");
});

test("custom top row dragee styles work properly", async ({ page }) => {
  const dragButton2 = page.getByRole("button", { name: "Reorder Row 2" });
  await dragButton2.hover();
  await page.mouse.down();

  const headerRow = page.locator("thead > tr");
  await expect(headerRow).toContainClass("custom-reorder-dragged-row-pred");
  const firstDataRow = page.locator('tr[aria-rowindex="2"]');
  await expect(firstDataRow).toContainClass("custom-reorder-dragged-row");

  const secondDataRowLowerPart = page.getByTestId("drag-target-y-lower");
  await secondDataRowLowerPart.hover({ force: true });
  const secondDataRow = page.locator('tr[aria-rowindex="3"]');
  const thirdDataRow = page.locator('tr[aria-rowindex="4"]');

  await expect(secondDataRow).toContainClass(
    "custom-reorder-above-drag-target-row",
  );
  await expect(thirdDataRow).toContainClass(
    "custom-reorder-below-drag-target-row",
  );

  const thirdDataRowLowerPart = page.getByTestId("drag-target-z-lower");
  await thirdDataRowLowerPart.hover({ force: true });

  await expect(thirdDataRow).toContainClass(
    "custom-reorder-above-drag-target-row",
  );
});

test("custom middle row dragee styles work properly", async ({ page }) => {
  const dragButton3 = page.getByRole("button", { name: "Reorder Row 3" });
  await dragButton3.hover();
  await page.mouse.down();

  const firstDataRow = page.locator('tr[aria-rowindex="2"]');
  const secondDataRow = page.locator('tr[aria-rowindex="3"]');
  await expect(firstDataRow).toContainClass("custom-reorder-dragged-row-pred");
  await expect(secondDataRow).toContainClass("custom-reorder-dragged-row");

  const firstDataRowUpperPart = page.getByTestId("drag-target-x-upper");
  await firstDataRowUpperPart.hover({ force: true });

  const headerRow = page.locator("thead > tr");
  await expect(headerRow).toContainClass(
    "custom-reorder-above-drag-target-row",
  );
  await expect(firstDataRow).toContainClass(
    "custom-reorder-below-drag-target-row",
  );
});

test("custom bottom row dragee styles work properly", async ({ page }) => {
  const dragButton4 = page.getByRole("button", { name: "Reorder Row 4" });
  await dragButton4.hover();
  await page.mouse.down();

  const secondDataRow = page.locator('tr[aria-rowindex="3"]');
  const thirdDataRow = page.locator('tr[aria-rowindex="4"]');
  await expect(secondDataRow).toContainClass("custom-reorder-dragged-row-pred");
  await expect(thirdDataRow).toContainClass("custom-reorder-dragged-row");

  const firstDataRowLowerPart = page.getByTestId("drag-target-x-lower");
  await firstDataRowLowerPart.hover({ force: true });
  const firstDataRow = page.locator('tr[aria-rowindex="2"]');

  await expect(firstDataRow).toContainClass(
    "custom-reorder-above-drag-target-row",
  );
  await expect(secondDataRow).toContainClass(
    "custom-reorder-below-drag-target-row",
  );
});

test("custom drag ghost styles work properly", async ({ page }) => {
  const dragButton3 = page.getByRole("button", { name: "Reorder Row 3" });
  await dragButton3.hover();
  await page.mouse.down();

  const ghostDiv = page.getByTestId("rbdg-drag-ghost");
  await expect(ghostDiv).toContainClass("custom-reorder-ghost");
  await expect(ghostDiv).toContainClass("border");
  await expect(ghostDiv).toContainClass("border-3");
});
