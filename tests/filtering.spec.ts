import { test, expect } from "@playwright/test";
import { validateGridContents } from "./util";

test.beforeEach(async ({ page }) => {
  await page.goto("filtering/test");
});

test("less than number filter works correctly", async ({ page }) => {
  const container = page.getByTestId("number less than grid container");

  const gridTable = container.locator('table[aria-rowcount="4"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [["-1"], ["0"], ["0.99999"]];
  await validateGridContents(tbody, expectedInitialContents);
});
