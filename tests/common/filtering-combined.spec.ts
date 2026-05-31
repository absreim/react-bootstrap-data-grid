import { expect, test } from "@playwright/test";
import { getTestIdVariants } from "../util";

["community", "pro"].forEach((edition) => {
  const url =
    edition === "pro" ? "filtering/combined/pro" : "filtering/combined";

  test.describe(`${edition} filtering combined tests`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    test(`${edition} combined filter and toggles work correctly`, async ({
      page,
    }) => {
      const testIdPrefix = "combined grid container";
      for (const testId of getTestIdVariants(testIdPrefix)) {
        const container = page.getByTestId(testId);

        let gridTable = container.locator('table[aria-rowcount="1"]');
        await expect(gridTable).toBeVisible();

        const filterToggleButton = container.getByRole("button", {
          name: "Show Filter Options",
        });

        // Uncheck string filter

        await filterToggleButton.click();
        await container
          .locator('input[aria-label="String Column Column Filter Toggle"]')
          .uncheck();
        await container.getByRole("button", { name: "Submit" }).click();

        gridTable = container.locator('table[aria-rowcount="2"]');
        await expect(gridTable).toBeVisible();

        // Uncheck number filter

        await filterToggleButton.click();
        await container
          .locator('input[aria-label="Number Column Column Filter Toggle"]')
          .uncheck();
        await container.getByRole("button", { name: "Submit" }).click();

        gridTable = container.locator('table[aria-rowcount="3"]');
        await expect(gridTable).toBeVisible();

        // Uncheck date filter

        await filterToggleButton.click();
        await container
          .locator('input[aria-label="Date Column Column Filter Toggle"]')
          .uncheck();
        await container.getByRole("button", { name: "Submit" }).click();

        gridTable = container.locator('table[aria-rowcount="4"]');
        await expect(gridTable).toBeVisible();

        // Uncheck datetime filter

        await filterToggleButton.click();
        await container
          .locator('input[aria-label="Datetime Column Column Filter Toggle"]')
          .uncheck();
        await container.getByRole("button", { name: "Submit" }).click();

        gridTable = container.locator('table[aria-rowcount="5"]');
        await expect(gridTable).toBeVisible();
      }
    });

    test(`${edition} caption works correctly`, async ({ page }) => {
      const testIdPrefix = "caption test grid container";
      for (const testId of getTestIdVariants(testIdPrefix)) {
        const container = page.getByTestId(testId);

        await container
          .getByRole("button", { name: "Show Filter Options" })
          .click();

        const filterOptionsTable = container
          .getByTestId("rbdg-filter-inputs-div")
          .getByRole("table");
        const caption = filterOptionsTable.getByRole("caption");
        await expect(caption).toHaveText("filter table test caption");
      }
    });

    test(`${edition} no initial state mode works correctly`, async ({
      page,
    }) => {
      const container = page.getByTestId("no initial state grid container");

      let gridTable = container.locator('table[aria-rowcount="5"]');
      await expect(gridTable).toBeVisible();

      const filterToggleButton = container.getByRole("button", {
        name: "Show Filter Options",
      });

      // Enable and input into string filter
      await filterToggleButton.click();
      await container
        .locator('input[aria-label="String Column Column Filter Toggle"]')
        .check();
      await container
        .getByRole("textbox", { name: "String Column Column Filter Value" })
        .fill("a");
      await container.getByRole("button", { name: "Submit" }).click();

      gridTable = container.locator('table[aria-rowcount="4"]');
      await expect(gridTable).toBeVisible();

      // Enable and input into number filter
      await filterToggleButton.click();
      await container
        .locator('input[aria-label="Number Column Column Filter Toggle"]')
        .check();
      await container
        .getByRole("spinbutton", { name: "Number Column Column Filter Value" })
        .fill("2");
      await container.getByRole("button", { name: "Submit" }).click();

      gridTable = container.locator('table[aria-rowcount="3"]');
      await expect(gridTable).toBeVisible();

      // Enable and input into date filter
      await filterToggleButton.click();
      await container
        .locator('input[aria-label="Date Column Column Filter Toggle"]')
        .check();
      await container
        .locator('input[aria-label="Date Column Column Filter Start Date"]')
        .fill("2025-01-01");
      await container.getByRole("button", { name: "Submit" }).click();

      gridTable = container.locator('table[aria-rowcount="2"]');
      await expect(gridTable).toBeVisible();

      // Enable and input into datetime filter
      await filterToggleButton.click();
      await container
        .locator('input[aria-label="Datetime Column Column Filter Toggle"]')
        .check();
      await container
        .locator('input[aria-label="Datetime Column Column Filter Start Date"]')
        .fill("2025-01-01T00:00");
      await container.getByRole("button", { name: "Submit" }).click();

      gridTable = container.locator('table[aria-rowcount="1"]');
      await expect(gridTable).toBeVisible();
    });

    // Flaky test. Possibly due to extra slow filter table inputs.
    test(`${edition} filtering interface works correctly from the toolbar`, async ({
      page,
    }) => {
      const testIdPrefix = "toolbar interface grid container";
      for (const testId of getTestIdVariants(testIdPrefix)) {
        const container = page.getByTestId(testId);

        let gridTable = container.locator('table[aria-rowcount="1"]');
        await expect(gridTable).toBeVisible();

        const toolbar = container.getByRole("toolbar");
        const filterToggle = toolbar.getByRole("button", { name: "Filtering" });
        await filterToggle.click();

        await container
          .locator('input[aria-label="String Column Column Filter Toggle"]')
          .uncheck();
        await container
          .locator('input[aria-label="Number Column Column Filter Toggle"]')
          .uncheck();
        await container
          .locator('input[aria-label="Date Column Column Filter Toggle"]')
          .uncheck();
        await container
          .locator('input[aria-label="Datetime Column Column Filter Toggle"]')
          .uncheck();

        await container.getByRole("button", { name: "Submit" }).click();

        gridTable = container.locator('table[aria-rowcount="5"]');
        await expect(gridTable).toBeVisible();
      }
    });
  });
});
