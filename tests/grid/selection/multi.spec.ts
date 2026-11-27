import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid/selection");

  const singleMultiToggle = page.getByRole("checkbox", {
    name: "Allow Multi Select",
  });
  await singleMultiToggle.check();
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

      const page3Link = page.getByRole("link", { name: "3" });
      await page3Link.click();
    });

    test("select and deselect by clicking on a row works", async ({ page }) => {
      const row12StrCell = page.getByRole("gridcell", {
        name: "12th row string",
      });
      await row12StrCell.click();

      const row13StrCell = page.getByRole("gridcell", {
        name: "13th row string",
      });
      await row13StrCell.click();

      const row12 = page.getByRole("row", { name: "12th row string" });
      await expect(row12).toHaveAttribute("aria-selected", "true");

      const row13 = page.getByRole("row", { name: "13th row string" });
      await expect(row13).toHaveAttribute("aria-selected", "true");

      await row12StrCell.click();
      await row13StrCell.click();

      await expect(row12).toHaveAttribute("aria-selected", "false");
      await expect(row13).toHaveAttribute("aria-selected", "false");
    });

    test("select and deselect via keyboard on a row works", async ({
      page,
    }) => {
      const row12StrCell = page.getByRole("gridcell", {
        name: "12th row string",
      });
      await row12StrCell.click();

      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Space");

      const row12 = page.getByRole("row", { name: "12th row string" });
      await expect(row12).toHaveAttribute("aria-selected", "true");

      const row13 = page.getByRole("row", { name: "13th row string" });
      await expect(row13).toHaveAttribute("aria-selected", "true");

      await page.keyboard.press("Space");

      await expect(row13).toHaveAttribute("aria-selected", "false");

      await page.keyboard.press("ArrowUp");
      await page.keyboard.press("Space");

      await expect(row12).toHaveAttribute("aria-selected", "false");
    });

    test("select and deselect all works via keyboard on the header row", async ({ page }) => {
      const stringColHeaderCell = page.getByRole("columnheader", {
        name: "String Column",
      });
      await stringColHeaderCell.click();
      await expect(stringColHeaderCell).toBeFocused();

      await page.keyboard.press("Space");

      const page3BodyRows = await page.getByRole("row", { name: "row string" }).all();
      for (const row of page3BodyRows) {
        await expect(row).toHaveAttribute("aria-selected", "true");
      }

      const nextPageLink = page.getByRole("link", { name: "Next" });
      await nextPageLink.click();

      const page4BodyRows = await page
        .getByRole("row", { name: "row string" })
        .all();
      for (const row of page4BodyRows) {
        await expect(row).toHaveAttribute("aria-selected", "true");
      }

      await stringColHeaderCell.click();
      await page.keyboard.press("Space");

      for (const row of page4BodyRows) {
        await expect(row).toHaveAttribute("aria-selected", "false");
      }

      const prevPageLink = page.getByRole("link", { name: "Previous" });
      await prevPageLink.click();

      for (const row of page3BodyRows) {
        await expect(row).toHaveAttribute("aria-selected", "false");
      }
    })
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
      const prevPageLink = page.getByRole("link", { name: "Previous" });
      await prevPageLink.click();
    });

    test("select and deselect by clicking on the input cell works", async ({
      page,
    }) => {
      const row16Cell = page.getByRole("gridcell", {
        name: "Select row 17",
      });
      await row16Cell.click();

      const row20Cell = page.getByRole("gridcell", {
        name: "Select row 21",
      });
      await row20Cell.click();

      const row16 = page.getByRole("row", { name: "16th row string" });
      await expect(row16).toHaveAttribute("aria-selected", "true");
      const row20 = page.getByRole("row", { name: "20th row string" });
      await expect(row20).toHaveAttribute("aria-selected", "true");

      await row20Cell.click();
      await expect(row20).toHaveAttribute("aria-selected", "false");

      await row16Cell.click();
      await expect(row20).toHaveAttribute("aria-selected", "false");
    });

    test("select and deselect using the keyboard on the input cell works", async ({
      page,
    }) => {
      const row16Cell = page.getByRole("gridcell", {
        name: "Select row 17",
      });
      await row16Cell.click();
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Space");

      const row16 = page.getByRole("row", { name: "16th row string" });
      await expect(row16).toHaveAttribute("aria-selected", "true");
      const row17 = page.getByRole("row", { name: "17th row string" });
      await expect(row17).toHaveAttribute("aria-selected", "true");

      await page.keyboard.press("Space");
      await expect(row17).toHaveAttribute("aria-selected", "false");

      await page.keyboard.press("ArrowUp");
      await page.keyboard.press("Space");
      await expect(row16).toHaveAttribute("aria-selected", "false");
    });

    test("deselect all works by clicking on the input cell", async ({ page }) => {
      const row18Cell = page.getByRole("gridcell", {
        name: "Select row 19",
      });
      await row18Cell.click();

      const row19Cell = page.getByRole("gridcell", {
        name: "Select row 20",
      });
      await row19Cell.click();

      const row18 = page.getByRole("row", { name: "18th row string" });
      await expect(row18).toHaveAttribute("aria-selected", "true");
      const row19 = page.getByRole("row", { name: "19th row string" });
      await expect(row19).toHaveAttribute("aria-selected", "true");

      const deselectAllInput = page.getByRole("checkbox", {
        name: "Deselect all rows",
      });
      await expect(deselectAllInput).toBeChecked();

      await deselectAllInput.click();

      const disabledSelectAllInput = page.getByRole("checkbox", {
        name: "Select all rows",
      });
      await expect(disabledSelectAllInput).not.toBeChecked();

      await expect(row18).toHaveAttribute("aria-selected", "false");
      await expect(row19).toHaveAttribute("aria-selected", "false");
    });

    test("deselect all works by using the keyboard on the input cell", async ({ page }) => {
      const row17Cell = page.getByRole("gridcell", {
        name: "Select row 18",
      });
      await row17Cell.click();
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Space");

      const row17 = page.getByRole("row", { name: "17th row string" });
      await expect(row17).toHaveAttribute("aria-selected", "true");
      const row18 = page.getByRole("row", { name: "18th row string" });
      await expect(row18).toHaveAttribute("aria-selected", "true");

      const stringColHeaderCell = page.getByRole("columnheader", {
        name: "String Column",
      });
      await stringColHeaderCell.click();
      await expect(stringColHeaderCell).toBeFocused();

      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("Space");

      await expect(row17).toHaveAttribute("aria-selected", "false");
      await expect(row18).toHaveAttribute("aria-selected", "false");
    });
  });
});
