import { test, expect } from '@playwright/test';

test('grid displays correct column headings', async ({ page }) => {
  await page.goto('test');

  const workingGridContainer = page.getByTestId("functioning grid container");
  const columns = await workingGridContainer.getByRole("columnheader").all();

  await expect(columns[0]).toHaveText("String Column");
  await expect(columns[1]).toHaveText("Number Column");
  await expect(columns[2]).toHaveText("Date Column");
  await expect(columns[3]).toHaveText("Datetime Column");
})
