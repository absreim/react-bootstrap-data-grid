import { test } from "@playwright/test";
import { getTestIdVariants, validateGridContents } from "../util";

["community", "pro"].forEach((edition) => {
  const url = edition === "pro" ? "filtering/dates/pro" : "filtering/dates";

  test.describe(`${edition} filtering dates tests`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    ["controlled", "uncontrolled"].forEach((controlScheme) => {
      test(`${edition} ${controlScheme} start date filter works correctly`, async ({ page }) => {
        const testId = `start date grid container-${controlScheme}`;
        const container = page.getByTestId(testId);

        const gridTable = container.locator('table[aria-rowcount="4"]');
        const tbody = gridTable.locator("tbody");
        const expectedInitialContents: string[][] = [
          ["2023-01-15"],
          ["2023-06-30"],
          ["2024-03-20"],
        ];
        await validateGridContents(tbody, expectedInitialContents);

        const toolbar = container.getByRole("toolbar");
        const filterToggle = toolbar.getByRole("button", {
          name: "Filtering",
        });
        await filterToggle.click();

        await container
          .locator('input[aria-label="Date Column Column Filter Start Date"]')
          .fill("2023-03-01");
        await container.getByRole("button", { name: "Submit" }).click();

        const newGridTable = container.locator('table[aria-rowcount="3"]');
        const expectedSubsequentContents: string[][] = [
          ["2023-06-30"],
          ["2024-03-20"],
        ];
        const newTbody = newGridTable.locator("tbody");
        await validateGridContents(newTbody, expectedSubsequentContents);
      });

      test(`${edition} ${controlScheme} end date filter works correctly`, async ({
        page,
      }) => {
        const testId = `end date grid container-${controlScheme}`;
        const container = page.getByTestId(testId);

        const gridTable = container.locator('table[aria-rowcount="4"]');
        const tbody = gridTable.locator("tbody");
        const expectedInitialContents: string[][] = [
          ["2022-12-25"],
          ["2023-01-15"],
          ["2023-06-30"],
        ];
        await validateGridContents(tbody, expectedInitialContents);

        const toolbar = container.getByRole("toolbar");
        const filterToggle = toolbar.getByRole("button", {
          name: "Filtering",
        });
        await filterToggle.click();

        await container
          .locator('input[aria-label="Date Column Column Filter End Date"]')
          .fill("2022-12-31");
        await container.getByRole("button", { name: "Submit" }).click();

        const newGridTable = container.locator('table[aria-rowcount="2"]');
        const expectedSubsequentContents: string[][] = [["2022-12-25"]];
        const newTbody = newGridTable.locator("tbody");
        await validateGridContents(newTbody, expectedSubsequentContents);
      });

      test(`${edition} ${controlScheme} between dates filter works correctly`, async ({
        page,
      }) => {
        const testId = `between dates grid container-${controlScheme}`;
        const container = page.getByTestId(testId);

        const gridTable = container.locator('table[aria-rowcount="5"]');
        const tbody = gridTable.locator("tbody");
        const expectedInitialContents: string[][] = [
          ["2022-12-25"],
          ["2023-01-15"],
          ["2023-06-30"],
          ["2024-03-20"],
        ];
        await validateGridContents(tbody, expectedInitialContents);

        const toolbar = container.getByRole("toolbar");
        const filterToggle = toolbar.getByRole("button", {
          name: "Filtering",
        });
        await filterToggle.click();

        await container
          .locator('input[aria-label="Date Column Column Filter Start Date"]')
          .fill("2023-01-01");
        await container
          .locator('input[aria-label="Date Column Column Filter End Date"]')
          .fill("2023-01-31");
        await container.getByRole("button", { name: "Submit" }).click();

        const newGridTable = container.locator('table[aria-rowcount="2"]');
        const expectedSubsequentContents: string[][] = [["2023-01-15"]];
        const newTbody = newGridTable.locator("tbody");
        await validateGridContents(newTbody, expectedSubsequentContents);
      });
    });
  });
});
