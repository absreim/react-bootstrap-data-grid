import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("styling/test");

  const toggleButton = page.getByRole("button", {
    name: "Show Filter Options",
  });
  await toggleButton.click();
});

test("high level div custom style works", async ({ page }) => {
  const filterInputsDiv = page.getByTestId("rbdg-filter-inputs-div");

  await expect(filterInputsDiv).toHaveClass("filter-inputs-div-test-class");
});

test("toggle button custom style works", async ({ page }) => {
  const toggleButton = page.getByRole("button", {
    name: "Hide Filter Options",
  });

  await expect(toggleButton).toContainClass(
    "filter-ui-toggle-button-test-class btn",
  );
  await expect(toggleButton).not.toContainClass("btn-primary");
});

test("filter table single element styles work", async ({ page }) => {
  const filterInputsDiv = page.getByTestId("rbdg-filter-inputs-div");
  const table = filterInputsDiv.getByRole("table");
  const tbody = table.locator("tbody");
  const thead = table.locator("thead");
  const theadTr = thead.locator("tr");
  const caption = table.getByRole("caption");
  const submitButton = filterInputsDiv.getByRole("button", { name: "Submit" });

  await expect(table).toHaveClass("table filter-input-table-test-class");
  await expect(tbody).toHaveClass("filter-input-table-body-test-class");
  await expect(thead).toHaveClass("filter-input-table-thead-test-class");
  await expect(theadTr).toHaveClass("filter-input-table-thead-tr-test-class");
  await expect(caption).toHaveClass("filter-input-table-caption-test-class");
  await expect(submitButton).toContainClass("submit-button-test-class btn");
  await expect(submitButton).not.toContainClass("btn-secondary");
});

test("row index-based universal styles work", async ({ page }) => {
  const filterInputsDiv = page.getByTestId("rbdg-filter-inputs-div");
  const table = filterInputsDiv.getByRole("table");
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
    const schemeSelectionInput = tr.locator('td[aria-colindex="4"] > select');
    await expect(schemeSelectionInput).toContainClass(
      `scheme-selection-input-test-class-row-${rowIndex}`,
    );
  }
});

test("type-specific input styles work", async ({ page }) => {
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

  await expect(strInput).toContainClass("search-string-input-test-class-row-0");
  await expect(numInput).toContainClass("number-input-test-class-row-1");
  await expect(startDateInput).toContainClass(
    "start-date-input-test-class-row-2",
  );
  await expect(endDateInput).toContainClass("end-date-input-test-class-row-2");
  await expect(endDatetimeInput).toContainClass(
    "end-date-input-test-class-row-3",
  );
});

test("row and col index-based styles work", async ({ page }) => {
  const filterInputsDiv = page.getByTestId("rbdg-filter-inputs-div");
  const table = filterInputsDiv.getByRole("table");
  const tbody = table.locator("tbody");

  for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
    const tr = tbody.locator(`tr[aria-rowindex="${rowIndex + 2}"]`);
    for (let colIndex = 0; colIndex < 5; colIndex++) {
      const td = tr.locator(`td[aria-colindex="${colIndex + 1}"]`);
      await expect(td).toContainClass(
        `filter-input-table-tbody-td-test-class-row-${rowIndex}` +
          " " +
          `filter-input-table-tbody-td-test-class-col-${colIndex}`,
      );
    }
  }
});
