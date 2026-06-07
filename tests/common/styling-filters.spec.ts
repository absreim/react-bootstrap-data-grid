import { test, expect } from "@playwright/test";

["community", "pro"].forEach((edition) => {
  const url = edition === "pro" ? "styling/filtering/pro" : "styling/filtering";

  test.describe(`${edition} filter style tests`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    test(`filter table single element styles work`, async ({ page }) => {
      const container = page.getByTestId("complete style model container");
      const toolbar = container.getByRole("toolbar");
      const filterToggle = toolbar.getByRole("button", { name: "Filtering" });
      await filterToggle.click();

      const toolbarUiContainer = container.getByTestId(
        "toolbar feature interface content container",
      );

      const form = toolbarUiContainer.locator("form");
      const table = toolbarUiContainer.getByRole("table");
      const tbody = table.locator("tbody");
      const thead = table.locator("thead");
      const theadTr = thead.locator("tr");
      const caption = table.getByRole("caption");
      const submitButton = toolbarUiContainer.getByRole("button", {
        name: "Submit",
      });

      await expect(form).toHaveClass("table-responsive");
      await expect(table).toHaveClass("filter-input-table-test-class");
      await expect(tbody).toHaveClass("filter-input-table-body-test-class");
      await expect(thead).toHaveClass("filter-input-table-thead-test-class");
      await expect(theadTr).toHaveClass(
        "filter-input-table-thead-tr-test-class",
      );
      await expect(caption).toHaveClass(
        "filter-input-table-caption-test-class",
      );
      await expect(submitButton).toHaveClass("submit-button-test-class");
    });

    test(`row index-based universal styles work`, async ({ page }) => {
      const container = page.getByTestId("complete style model container");
      const toolbar = container.getByRole("toolbar");
      const filterToggle = toolbar.getByRole("button", { name: "Filtering" });
      await filterToggle.click();

      const toolbarUiContainer = container.getByTestId(
        "toolbar feature interface content container",
      );

      const table = toolbarUiContainer.getByRole("table");
      const tbody = table.locator("tbody");

      for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
        const tr = tbody.locator(`tr[aria-rowindex="${rowIndex + 2}"]`);
        await expect(tr).toHaveClass(
          `filter-input-table-tbody-tr-test-class-row-${rowIndex}`,
        );
        const enablementInput = tr.locator('td[aria-colindex="1"] > input');
        await expect(enablementInput).toHaveClass(
          `enablement-input-test-class-row-${rowIndex}`,
        );
        const schemeSelectionInput = tr.locator(
          'td[aria-colindex="4"] > select',
        );
        await expect(schemeSelectionInput).toHaveClass(
          `scheme-selection-input-test-class-row-${rowIndex}`,
        );
      }
    });

    test(`null row index-based universal styles work`, async ({ page }) => {
      const container = page.getByTestId("null style model container");
      const toolbar = container.getByRole("toolbar");
      const filterToggle = toolbar.getByRole("button", { name: "Filtering" });
      await filterToggle.click();

      const toolbarUiContainer = container.getByTestId(
        "toolbar feature interface content container",
      );

      const table = toolbarUiContainer.getByRole("table");
      const tbody = table.locator("tbody");

      for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
        const tr = tbody.locator(`tr[aria-rowindex="${rowIndex + 2}"]`);
        await expect(tr).toHaveClass("");
        const enablementInput = tr.locator('td[aria-colindex="1"] > input');
        await expect(enablementInput).toHaveClass("");
        const schemeSelectionInput = tr.locator(
          'td[aria-colindex="4"] > select',
        );
        await expect(schemeSelectionInput).toHaveClass("form-select");
      }
    });

    test(`type-specific input styles work`, async ({ page }) => {
      const container = page.getByTestId("complete style model container");
      const toolbar = container.getByRole("toolbar");
      const filterToggle = toolbar.getByRole("button", { name: "Filtering" });
      await filterToggle.click();

      const strInput = page.getByRole("textbox", {
        name: "String Column Column Filter Value",
      });
      const numInput = page.getByRole("spinbutton", {
        name: "Number Column Column Filter Value",
      });
      const startDateInput = page.getByRole("textbox", {
        name: "Date Column Column Filter Start Date",
      });
      const endDateInput = page.getByRole("textbox", {
        name: "Date Column Column Filter End Date",
      });
      const endDatetimeInput = page.getByRole("textbox", {
        name: "Datetime Column Column Filter End Date",
      });

      await expect(strInput).toHaveClass(
        "search-string-input-test-class-row-0",
      );
      await expect(numInput).toHaveClass("number-input-test-class-row-1");
      await expect(startDateInput).toHaveClass(
        "start-date-input-test-class-row-2",
      );
      await expect(endDateInput).toHaveClass("end-date-input-test-class-row-2");
      await expect(endDatetimeInput).toHaveClass(
        "end-date-input-test-class-row-3",
      );
    });

    test(`null type-specific input styles work`, async ({ page }) => {
      const container = page.getByTestId("null style model container");
      const toolbar = container.getByRole("toolbar");
      const filterToggle = toolbar.getByRole("button", { name: "Filtering" });
      await filterToggle.click();

      const strInput = page.getByRole("textbox", {
        name: "String Column Column Filter Value",
      });
      const numInput = page.getByRole("spinbutton", {
        name: "Number Column Column Filter Value",
      });
      const startDateInput = page.getByRole("textbox", {
        name: "Date Column Column Filter Start Date",
      });
      const endDateInput = page.getByRole("textbox", {
        name: "Date Column Column Filter End Date",
      });
      const endDatetimeInput = page.getByRole("textbox", {
        name: "Datetime Column Column Filter End Date",
      });

      await expect(strInput).toHaveClass("form-control");
      await expect(numInput).toHaveClass("form-control");
      await expect(startDateInput).toHaveClass("form-control");
      await expect(endDateInput).toHaveClass("form-control");
      await expect(endDatetimeInput).toHaveClass("form-control");
    });

    test(`row and col index-based styles work`, async ({ page }) => {
      const container = page.getByTestId("complete style model container");
      const toolbar = container.getByRole("toolbar");
      const filterToggle = toolbar.getByRole("button", { name: "Filtering" });
      await filterToggle.click();

      const toolbarUiContainer = container.getByTestId(
        "toolbar feature interface content container",
      );

      const table = toolbarUiContainer.getByRole("table");
      const tbody = table.locator("tbody");

      for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
        const tr = tbody.locator(`tr[aria-rowindex="${rowIndex + 2}"]`);
        for (let colIndex = 0; colIndex < 5; colIndex++) {
          const td = tr.locator(`td[aria-colindex="${colIndex + 1}"]`);
          await expect(td).toHaveClass(
            `filter-input-table-tbody-td-test-class-row-${rowIndex}` +
              " " +
              `filter-input-table-tbody-td-test-class-col-${colIndex}`,
          );
        }
      }
    });

    test("null row and col index-based styles work", async ({ page }) => {
      const container = page.getByTestId("null style model container");
      const toolbar = container.getByRole("toolbar");
      const filterToggle = toolbar.getByRole("button", { name: "Filtering" });
      await filterToggle.click();

      const toolbarUiContainer = container.getByTestId(
        "toolbar feature interface content container",
      );

      const table = toolbarUiContainer.getByRole("table");
      const tbody = table.locator("tbody");

      for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
        const tr = tbody.locator(`tr[aria-rowindex="${rowIndex + 2}"]`);
        for (let colIndex = 0; colIndex < 5; colIndex++) {
          const td = tr.locator(`td[aria-colindex="${colIndex + 1}"]`);
          await expect(td).toHaveClass("");
        }
      }
    });
  });
});
