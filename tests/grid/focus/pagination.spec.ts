import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid/pagination");
});

test("focus by clicking works on a page other than the first", async ({
  page,
}) => {
  const page2Link = page.getByRole("link", { name: "2" });
  await page2Link.click();

  const row10DatetimeCell = page.getByText("2026-10-10T10:10");
  await row10DatetimeCell.click();
  await expect(row10DatetimeCell).toBeFocused();

  const row9DateCell = page.getByText("1788912000000");
  await row9DateCell.click();
  await expect(row9DateCell).toBeFocused();
});

test("a focus row coordinate that becomes out-of-bounds ends up at the last displayed row", async ({
  page,
}) => {
  const rowsPerPageDropdown = page.getByRole("combobox", {
    name: "Rows per page",
  });
  await rowsPerPageDropdown.selectOption("10");

  const page2Link = page.getByRole("link", { name: "2" });
  await page2Link.click();

  const row20DatetimeCell = page.getByText("2027-08-08T08:08");
  await row20DatetimeCell.click();
  await expect(row20DatetimeCell).toBeFocused();

  await rowsPerPageDropdown.selectOption("5");
  // For some reason, focus is not kept after selecting an option. Explicitly
  // instructing Playwright to click on the dropdown seems to work as a
  // workaround.
  await rowsPerPageDropdown.click();
  await page.keyboard.press("Shift+Tab");

  const row10DatetimeCell = page.getByText("2026-10-10T10:10");
  await expect(row10DatetimeCell).toBeFocused();
});

test("keyboard navigation works on pages other than the first", async ({
  page,
}) => {
  const page3Link = page.getByRole("link", { name: "3" });
  await page3Link.click();

  const row15DatetimeCell = page.getByText("2027-03-03T03:03");
  await row15DatetimeCell.click();
  await expect(row15DatetimeCell).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  const row15DateCell = page.getByText("1804032000000");
  await expect(row15DateCell).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(row15DatetimeCell).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(row15DatetimeCell).toBeFocused();

  await page.keyboard.press("ArrowUp");
  const row14DatetimeCell = page.getByText("2027-02-02T02:02");
  await expect(row14DatetimeCell).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(row15DatetimeCell).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(row15DatetimeCell).toBeFocused();
});
