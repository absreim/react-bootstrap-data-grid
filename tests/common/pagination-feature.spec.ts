import { test, expect } from "@playwright/test";
import { getTestIdVariants, validateGridContents } from "../util";

["community", "pro"].forEach((edition) => {
  const url =
    edition === "pro" ? "pagination/feature/pro" : "pagination/feature";

  test.describe(`${edition} pagination feature tests`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    test(`${edition} numerical buttons work correctly`, async ({ page }) => {
      const testIdPrefix = "15-row test container";
      for (const testId of getTestIdVariants(testIdPrefix)) {
        const container = page.getByTestId(testId);
        const gridTable = container.locator('table[aria-rowcount="16"]');
        const tbody = gridTable.locator("tbody");

        const expectedInitialContents: string[][] = [
          ["1"],
          ["2"],
          ["3"],
          ["4"],
          ["5"],
        ];
        await validateGridContents(tbody, expectedInitialContents);

        await container.getByRole("link", { name: "2" }).click();
        await expect(container.locator('tr[data-rowid="5"]')).toBeVisible();
        const expectedSecondPageContents: string[][] = [
          ["6"],
          ["7"],
          ["8"],
          ["9"],
          ["10"],
        ];
        await validateGridContents(tbody, expectedSecondPageContents, 5);

        await container.getByRole("link", { name: "3" }).click();
        await expect(container.locator('tr[data-rowid="10"]')).toBeVisible();
        const expectedThirdPageContents: string[][] = [
          ["11"],
          ["12"],
          ["13"],
          ["14"],
          ["15"],
        ];
        await validateGridContents(tbody, expectedThirdPageContents, 10);
      }
    });

    test(`${edition} next and previous buttons work correctly`, async ({
      page,
    }) => {
      const testIdPrefix = "15-row test container";
      for (const testId of getTestIdVariants(testIdPrefix)) {
        const container = page.getByTestId(testId);
        const gridTable = container.locator('table[aria-rowcount="16"]');
        const tbody = gridTable.locator("tbody");

        const expectedInitialContents: string[][] = [
          ["1"],
          ["2"],
          ["3"],
          ["4"],
          ["5"],
        ];
        await validateGridContents(tbody, expectedInitialContents);

        await container.getByRole("link", { name: "Next" }).click();
        await expect(container.locator('tr[data-rowid="5"]')).toBeVisible();
        const expectedSecondPageContents: string[][] = [
          ["6"],
          ["7"],
          ["8"],
          ["9"],
          ["10"],
        ];
        await validateGridContents(tbody, expectedSecondPageContents, 5);

        await container.getByRole("link", { name: "Next" }).click();
        await expect(container.locator('tr[data-rowid="10"]')).toBeVisible();
        const expectedThirdPageContents: string[][] = [
          ["11"],
          ["12"],
          ["13"],
          ["14"],
          ["15"],
        ];
        await validateGridContents(tbody, expectedThirdPageContents, 10);

        await container.getByRole("link", { name: "Previous" }).click();
        await expect(container.locator('tr[data-rowid="5"]')).toBeVisible();
        await validateGridContents(tbody, expectedSecondPageContents, 5);
      }
    });

    test(`${edition} feature preserves page index when possible when selecting new page size`, async ({
      page,
    }) => {
      const testIdPrefix = "15-row test container";
      for (const testId of getTestIdVariants(testIdPrefix)) {
        const container = page.getByTestId(testId);
        const gridTable = container.locator('table[aria-rowcount="16"]');
        const tbody = gridTable.locator("tbody");

        await container.getByRole("link", { name: "2" }).click();
        const expectedSecondPageContents: string[][] = [
          ["6"],
          ["7"],
          ["8"],
          ["9"],
          ["10"],
        ];
        await validateGridContents(tbody, expectedSecondPageContents, 5);

        await container
          .locator('select[aria-label="Number of Rows per Page"]')
          .selectOption("1");
        await expect(container.locator('tr[data-rowid="14"]')).toBeVisible();

        const expectedTenSizeSecondPageContents: string[][] = [
          ["11"],
          ["12"],
          ["13"],
          ["14"],
          ["15"],
        ];
        await validateGridContents(
          tbody,
          expectedTenSizeSecondPageContents,
          10,
        );

        await container
          .locator('select[aria-label="Number of Rows per Page"]')
          .selectOption("0");
        await expect(container.locator('tr[data-rowid="9"]')).toBeVisible();
        await validateGridContents(tbody, expectedSecondPageContents, 5);
      }
    });

    test(`${edition} feature snaps to largest possible index if new page size would cause index to be too large`, async ({
      page,
    }) => {
      const testIdPrefix = "15-row test container";
      for (const testId of getTestIdVariants(testIdPrefix)) {
        const container = page.getByTestId(testId);
        const gridTable = container.locator('table[aria-rowcount="16"]');
        const tbody = gridTable.locator("tbody");

        await container.getByRole("link", { name: "3" }).click();
        const expectedThirdPageContents: string[][] = [
          ["11"],
          ["12"],
          ["13"],
          ["14"],
          ["15"],
        ];
        await validateGridContents(tbody, expectedThirdPageContents, 10);

        await container
          .locator('select[aria-label="Number of Rows per Page"]')
          .selectOption("2");
        await expect(container.locator('tr[data-rowid="14"]')).toBeVisible();
        await expect(container.locator('tr[data-rowid="0"]')).toBeVisible();
        const expectedFullPageContents: string[][] = [
          ["1"],
          ["2"],
          ["3"],
          ["4"],
          ["5"],
          ["6"],
          ["7"],
          ["8"],
          ["9"],
          ["10"],
          ["11"],
          ["12"],
          ["13"],
          ["14"],
          ["15"],
        ];
        await validateGridContents(tbody, expectedFullPageContents);
        const activeLi = container.locator('li[aria-current="page"]');
        await expect(activeLi).toHaveClass("page-item active");
        await expect(activeLi.getByRole("link", { name: "1" })).toBeVisible();
      }
    });

    test(`${edition} first and last buttons work correctly`, async ({
      page,
    }) => {
      const testIdPrefix = "edge button test container";
      for (const testId of getTestIdVariants(testIdPrefix)) {
        const container = page.getByTestId(testId);
        const gridTable = container.locator('table[aria-rowcount="16"]');

        const tbody = gridTable.locator("tbody");

        const expectedInitialContents: string[][] = [["1"], ["2"], ["3"]];
        await validateGridContents(tbody, expectedInitialContents);

        await container.getByRole("link", { name: "Last" }).click();
        await expect(container.locator('tr[data-rowid="14"]')).toBeVisible();
        const expectedLastPageContents: string[][] = [["13"], ["14"], ["15"]];
        await validateGridContents(tbody, expectedLastPageContents, 12);

        await container.getByRole("link", { name: "First" }).click();
        await expect(container.locator('tr[data-rowid="0"]')).toBeVisible();
        await validateGridContents(tbody, expectedInitialContents);
      }
    });
  });
});
