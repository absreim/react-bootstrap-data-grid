import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("styling/test/main");
});

test("single element styles work", async ({ page }) => {
  const topLevelDiv = page.getByTestId("rbdg-top-level-div");
  const tableAndPaginationDiv = page.getByTestId(
    "rbdg-table-and-pagination-div",
  );
  const table = page.getByRole("table");
  const tbody = page.locator("tbody");
  const thead = page.locator("thead");
  const theadTr = thead.getByRole("row");
  const caption = page.getByRole("caption");
  const editColTh = page.getByRole("columnheader", { name: "Edit Controls" });
  const rowSelectColTh = page.getByRole("columnheader", {
    name: "Select all rows",
  });

  await expect(topLevelDiv).toHaveClass("top-level-div-test-class");
  await expect(tableAndPaginationDiv).toHaveClass(
    "table-and-pagination-div-test-class",
  );
  await expect(table).toContainClass("main-table-test-class table");
  await expect(tbody).toHaveClass("main-table-body-test-class");
  await expect(thead).toHaveClass("main-table-thead-test-class");
  await expect(theadTr).toHaveClass("main-table-thead-tr-test-class");
  await expect(caption).toHaveClass("main-table-caption-test-class");
  await expect(editColTh).toHaveClass("main-table-edit-col-th-test-class");
  await expect(rowSelectColTh).toContainClass(
    [
      "rbdg-select-header-cell",
      "rbdg-clickable-grid-header-cell",
      "main-table-row-select-col-th-test-class",
    ].join(" "),
  );
});

test("col index-based styles work", async ({ page }) => {
  const thead = page.locator("thead");
  for (let colIndex = 0; colIndex < 2; colIndex++) {
    const th = thead.locator(`th[aria-colindex="${colIndex + 2}"]`);
    await expect(th).toContainClass(
      `main-table-thead-th-test-class-col-${colIndex}}`,
    );
  }
});

const displayIndexToOrigIndex: Record<0 | 1, number> = {
  0: 1,
  1: 0,
};

test("body rows and cells styling works", async ({ page }) => {
  const tbody = page.locator("tbody");
  for (let displayIndex = 0; displayIndex < 2; displayIndex++) {
    const tr = tbody.locator(`tr[aria-rowindex="${displayIndex + 2}"]`);
    const origIndex = displayIndexToOrigIndex[displayIndex as 0 | 1];
    await expect(tr).toHaveClass(
      [
        `main-table-tbody-tr-test-class-orig-index-${origIndex}`,
        `main-table-tbody-tr-test-class-display-index-${displayIndex}`,
      ].join(" "),
    );
    for (let colIndex = 0; colIndex < 2; colIndex++) {
      const td = tr.locator(`td[aria-colindex="${colIndex + 2}"]`);
      await expect(td).toHaveClass(
        [
          `main-table-tbody-td-test-class-orig-index-${origIndex}-col-index-${colIndex}`,
          `main-table-tbody-td-test-class-display-index-${displayIndex}-col-index-${colIndex}`,
        ].join(" "),
      );
    }
  }
});

test("select column control styling works", async ({ page }) => {
  const tbody = page.locator("tbody");
  for (let displayIndex = 0; displayIndex < 2; displayIndex++) {
    const tr = tbody.locator(`tr[aria-rowindex="${displayIndex + 2}"]`);
    const origIndex = displayIndexToOrigIndex[displayIndex as 0 | 1];
    const td = tr.locator('td[aria-colindex="1"]');
    await expect(td).toHaveClass(
      [
        `main-table-row-select-call-td-test-class-orig-index-${origIndex}`,
        `main-table-row-select-call-td-test-class-display-index-${displayIndex}`,
      ].join(" "),
    );
    const input = td.getByRole("checkbox");
    await expect(input).toHaveClass(
      [
        `main-table-row-select-input-test-class-orig-index-${origIndex}`,
        `main-table-row-select-input-test-class-display-index-${displayIndex}`,
      ].join(" "),
    );
  }
});

test("edit control styling works", async ({ page }) => {
  const tbody = page.locator("tbody");
  for (let displayIndex = 0; displayIndex < 2; displayIndex++) {
    const tr = tbody.locator(`tr[aria-rowindex="${displayIndex + 2}"]`);
    const origIndex = displayIndexToOrigIndex[displayIndex as 0 | 1];
    const deleteButton = tr.getByRole("button", { name: "Delete" });
    const editButton = tr.getByRole("button", { name: "Edit" });
    await expect(deleteButton).toContainClass(
      [
        "btn",
        `main-table-edit-delete-button-test-class-orig-index-${origIndex}`,
        `main-table-edit-delete-button-test-class-display-index-${displayIndex}`,
      ].join(" "),
    );
    await expect(editButton).toContainClass(
      [
        "btn",
        `main-table-edit-start-button-test-class-orig-index-${origIndex}`,
        `main-table-edit-start-button-test-class-display-index-${displayIndex}`,
      ].join(" "),
    );

    await editButton.click();

    const saveButton = tr.getByRole("button", { name: "Save" });
    const cancelButton = tr.getByRole("button", { name: "Cancel" });
    await expect(saveButton).toContainClass(
      [
        "btn",
        `main-table-edit-save-button-test-class-orig-index-${origIndex}`,
        `main-table-edit-save-button-test-class-display-index-${displayIndex}`,
      ].join(" "),
    );
    await expect(cancelButton).toContainClass(
      [
        "btn",
        `main-table-edit-cancel-button-test-class-orig-index-${origIndex}`,
        `main-table-edit-cancel-button-test-class-display-index-${displayIndex}`,
      ].join(" "),
    );
    for (let colIndex = 0; colIndex < 2; colIndex++) {
      const td = tr.locator(`td[aria-colindex="${colIndex + 2}"]`);
      const input = td.locator("input");

      await expect(input).toContainClass(
        [
          "form-control",
          `main-table-tbody-td-input-test-class-orig-index-${origIndex}-col-index-${colIndex}`,
          `main-table-tbody-td-input-test-class-display-index-${displayIndex}-col-index-${colIndex}`,
        ].join(" "),
      );
    }

    const editColTd = tr.locator('td[aria-colindex="4"]');
    await expect(editColTd).toContainClass(
      [
        `main-table-edit-col-td-test-class-orig-index-${origIndex}`,
        `main-table-edit-col-td-test-class-display-index-${displayIndex}`,
      ].join(" "),
    );
  }
});
