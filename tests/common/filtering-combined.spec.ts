import { expect, test } from "@playwright/test";

["community", "pro"].forEach((edition) => {
  const url =
    edition === "pro" ? "filtering/combined/pro" : "filtering/combined";

  test.describe(`${edition} filtering combined tests`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    ["controlled", "uncontrolled"].forEach((controlScheme) => {
      test.describe(`${edition} ${controlScheme} filtering combined tests`, () => {
        test(`${edition} ${controlScheme} combined filter and toggles work correctly`, async ({
          page,
        }) => {
          const testId = `combined grid container-${controlScheme}`;
          const container = page.getByTestId(testId);

          let gridTable = container.locator('table[aria-rowcount="1"]');
          await expect(gridTable).toBeVisible();

          const toolbar = container.getByRole("toolbar");
          const filterToggle = toolbar.getByRole("button", {
            name: "Filtering",
          });

          // Uncheck string filter

          await filterToggle.click();
          await container
            .locator('input[aria-label="String Column Column Filter Toggle"]')
            .uncheck();
          await container.getByRole("button", { name: "Submit" }).click();

          gridTable = container.locator('table[aria-rowcount="2"]');
          await expect(gridTable).toBeVisible();

          // Uncheck number filter

          await filterToggle.click();
          await container
            .locator('input[aria-label="Number Column Column Filter Toggle"]')
            .uncheck();
          await container.getByRole("button", { name: "Submit" }).click();

          gridTable = container.locator('table[aria-rowcount="3"]');
          await expect(gridTable).toBeVisible();

          // Uncheck date filter

          await filterToggle.click();
          await container
            .locator('input[aria-label="Date Column Column Filter Toggle"]')
            .uncheck();
          await container.getByRole("button", { name: "Submit" }).click();

          gridTable = container.locator('table[aria-rowcount="4"]');
          await expect(gridTable).toBeVisible();

          // Uncheck datetime filter

          await filterToggle.click();
          await container
            .locator('input[aria-label="Datetime Column Column Filter Toggle"]')
            .uncheck();
          await container.getByRole("button", { name: "Submit" }).click();

          gridTable = container.locator('table[aria-rowcount="5"]');
          await expect(gridTable).toBeVisible();
        });

        test(`${edition} ${controlScheme} caption works correctly`, async ({
          page,
        }) => {
          const testId = `caption test grid container-${controlScheme}`;
          const container = page.getByTestId(testId);

          const toolbar = container.getByRole("toolbar");
          const filterToggle = toolbar.getByRole("button", {
            name: "Filtering",
          });
          await filterToggle.click();

          const caption = page.getByRole("caption");
          await expect(caption).toHaveText("filter table test caption");
        });
      });
    });

    test(`${edition} no initial state mode works correctly`, async ({
      page,
    }) => {
      const container = page.getByTestId("no initial state grid container");

      let gridTable = container.locator('table[aria-rowcount="5"]');
      await expect(gridTable).toBeVisible();

      const toolbar = container.getByRole("toolbar");
      const filterToggle = toolbar.getByRole("button", { name: "Filtering" });

      // Enable and input into string filter
      await filterToggle.click();
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
      // Known to be flaky due to checkbox not changing within 20ms threshold
      await filterToggle.click();
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
      await filterToggle.click();
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
      await filterToggle.click();
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
  });
});
