import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid/selection");
});

["both", "row"].forEach((mode) => {
  test.describe(`row selection tests for ${mode} mode`, () => {
    test.beforeEach(async ({ page }) => {
      if (mode === "row") {
        const selectModeGroup = page.getByRole("group", {
          name: "Selection Mode",
        });
        const rowRadio = selectModeGroup.getByRole("radio", { name: "Row" });
        await rowRadio.check();
      }

      const page2Link = page.getByRole("link", { name: "2" });
      await page2Link.click();

      const row6StrCell = page.getByRole("gridcell", {
        name: "6th row string",
      });
      await row6StrCell.click();
    });

    test(`select and deselect by clicking on a row works`, async ({ page }) => {
      const row6 = page.getByRole("row", { name: "6th row string" });
      await expect(row6).toHaveAttribute("aria-selected", "true");

      const row6StrCell = page.getByRole("gridcell", {
        name: "6th row string",
      });
      await row6StrCell.click();
      await expect(row6).toHaveAttribute("aria-selected", "false");
    });

    test(`select and deselect via keyboard works`, async ({ page }) => {
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Space");

      const row7 = page.getByRole("row", { name: "7th row string" });
      await expect(row7).toHaveAttribute("aria-selected", "true");

      await page.keyboard.press("Space");
      await expect(row7).toHaveAttribute("aria-selected", "false");
    });
  });
});

["both", "column"].forEach((mode) => {
  test.describe(`column selection tests for ${mode} mode`, () => {
    test.beforeEach(async ({ page }) => {
      if (mode === "column") {
        const columnRadio = page.getByRole("radio", { name: "Column" });
        await columnRadio.check();
      }

      const lastPageLink = page.getByRole("link", { name: "Last" });
      await lastPageLink.click();

      const row25Cell = page.getByRole("gridcell", {
        name: "Select row 26",
      });
      await row25Cell.click();
    });

    test("select and deselect by clicking on a selection input works", async ({
      page,
    }) => {
      const row25 = page.getByRole("row", { name: "25th row string" });
      await expect(row25).toHaveAttribute("aria-selected", "true");

      const row25Cell = page.getByRole("gridcell", {
        name: "Select row 26",
      });
      await row25Cell.click();
      await expect(row25).toHaveAttribute("aria-selected", "false");
    });

    test(`select and deselect via keyboard works`, async ({ page }) => {
      await page.keyboard.press("ArrowUp");
      await page.keyboard.press("Space");

      const row24 = page.getByRole("row", { name: "24th row string" });
      await expect(row24).toHaveAttribute("aria-selected", "true");

      await page.keyboard.press("Space");
      await expect(row24).toHaveAttribute("aria-selected", "false");
    });

    test("deselect by clicking on the header input works", async ({ page }) => {
      const deselectAllInput = page.getByRole("checkbox", {
        name: "Deselect all rows",
      });
      await expect(deselectAllInput).toBeChecked();

      await deselectAllInput.click();

      const disabledSelectAllInput = page.getByRole("checkbox", {
        name: "Select all (disabled)",
      });
      await expect(disabledSelectAllInput).not.toBeChecked();

      const row25 = page.getByRole("row", { name: "25th row string" });
      await expect(row25).toHaveAttribute("aria-selected", "false");
    });

    test("deselect by using the keyboard on the header input works", async ({
      page,
    }) => {
      const stringColHeaderCell = page.getByRole("columnheader", {
        name: "String Column",
      });
      await stringColHeaderCell.click();
      await expect(stringColHeaderCell).toBeFocused();

      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("Space");

      const row25 = page.getByRole("row", { name: "25th row string" });
      await expect(row25).toHaveAttribute("aria-selected", "false");
    });
  });
});

test("deselect works by keyboard on a column header cell when in both mode", async ({
  page,
}) => {
  const nextPageLink = page.getByRole("link", { name: "Next" });
  await nextPageLink.click();

  const row8Cell = page.getByRole("gridcell", {
    name: "Select row 9",
  });
  await row8Cell.click();

  const row8 = page.getByRole("row", { name: "8th row string" });
  await expect(row8).toHaveAttribute("aria-selected", "true");

  const numColHeaderCell = page.getByRole("columnheader", {
    name: "Number Column",
  });
  await numColHeaderCell.click();

  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("Space");

  await expect(row8).toHaveAttribute("aria-selected", "false");
});

test("deselect works even with sorting enabled", async ({ page }) => {
  const allowSortingCheckbox = page.getByRole("checkbox", {
    name: "Allow Sorting",
  });
  await allowSortingCheckbox.click();

  const row1StrCell = page.getByRole("gridcell", { name: "1st row string" });
  await row1StrCell.click();

  const row1 = page.getByRole("row", { name: "1st row string" });
  await expect(row1).toHaveAttribute("aria-selected", "true");

  const numberHeaderCell = page.getByRole("columnheader", {
    name: "Number Column",
  });
  await numberHeaderCell.click();
  await page.keyboard.press("Space");

  await expect(row1).toHaveAttribute("aria-selected", "false");

  await row1StrCell.click();
  await expect(row1).toHaveAttribute("aria-selected", "true");

  const stringHeaderCell = page.getByRole("columnheader", {
    name: "String Column",
  });
  await stringHeaderCell.click();
  await page.keyboard.press("Space");
  await page.keyboard.press("Space");

  await expect(row1).toHaveAttribute("aria-selected", "false");
});
