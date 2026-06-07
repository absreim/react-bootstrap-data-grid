import { test, expect } from "@playwright/test";

const displayIndexToOrigIndex: Record<0 | 1, number> = {
  0: 1,
  1: 0,
};

["community", "pro"].forEach((edition) => {
  const url = edition === "pro" ? "styling/main/pro" : "styling/main";

  test.describe(`${edition} main style tests`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    test(`single element styles work`, async ({ page }) => {
      const container = page.getByTestId("complete style model container");
      const topLevelDiv = container.getByTestId("rbdg-top-level-div");
      const tableAndPaginationDiv = container.getByTestId(
        "rbdg-table-and-pagination-div",
      );
      const tableDiv = container.getByTestId("rbdg-table-div");
      const paginationUiDiv = container.getByTestId(
        "pagination ui container div",
      );
      const table = container.getByRole("table");
      const tbody = container.locator("tbody");
      const thead = container.locator("thead");
      const theadTr = thead.getByRole("row");
      const caption = container.getByRole("caption");
      const editColTh = container.getByRole("columnheader", {
        name: "Edit Controls",
      });
      const rowSelectColTh = container.getByRole("columnheader", {
        name: "Select all rows",
      });

      await expect(topLevelDiv).toHaveClass("top-level-div-test-class");
      await expect(tableAndPaginationDiv).toHaveClass(
        "table-and-pagination-div-test-class",
      );
      await expect(tableDiv).toHaveClass("table-div-test-class");
      await expect(paginationUiDiv).toHaveClass("pagination-ui-div-test-class");
      await expect(table).toHaveClass("table-hover main-table-test-class");
      await expect(tbody).toHaveClass("main-table-body-test-class");
      await expect(thead).toHaveClass("main-table-thead-test-class");
      await expect(theadTr).toHaveClass("main-table-thead-tr-test-class");
      await expect(caption).toHaveClass("main-table-caption-test-class");
      await expect(editColTh).toHaveClass("main-table-edit-col-th-test-class");
      await expect(rowSelectColTh).toHaveClass(
        "main-table-row-select-col-th-test-class",
      );
    });

    test(`col index-based styles work`, async ({ page }) => {
      const container = page.getByTestId("complete style model container");
      const thead = container.locator("thead");
      for (let colIndex = 0; colIndex < 2; colIndex++) {
        const th = thead.locator(`th[aria-colindex="${colIndex + 2}"]`);
        await expect(th).toContainClass(
          `main-table-thead-th-test-class-col-${colIndex}`,
        );
      }
    });

    test(`null col index-based styles work`, async ({ page }) => {
      const container = page.getByTestId("null style model container");
      const thead = container.locator("thead");
      const strTh = thead.locator(`th[aria-colindex="2"]`);
      await expect(strTh).toHaveClass("");
      const numTh = thead.locator(`th[aria-colindex="3"]`);
      await expect(numTh).toHaveClass("rbdg-sort-toggler table-active");
    });

    test(`body rows and cells styling works`, async ({ page }) => {
      const container = page.getByTestId("complete style model container");
      const tbody = container.locator("tbody");
      for (let displayIndex = 0; displayIndex < 2; displayIndex++) {
        const tr = tbody.locator(`tr[aria-rowindex="${displayIndex + 5}"]`);
        const origIndex = displayIndexToOrigIndex[displayIndex as 0 | 1];
        await expect(tr).toHaveClass(
          [
            `main-table-tbody-tr-test-class-row-id-${origIndex}`,
            `main-table-tbody-tr-test-class-display-index-${displayIndex}`,
          ].join(" "),
        );
        for (let colIndex = 0; colIndex < 2; colIndex++) {
          const td = tr.locator(`td[aria-colindex="${colIndex + 2}"]`);
          await expect(td).toHaveClass(
            [
              `main-table-tbody-td-test-class-row-id-${origIndex}-col-index-${colIndex}`,
              `main-table-tbody-td-test-class-display-index-${displayIndex}-col-index-${colIndex}`,
            ].join(" "),
          );
        }
      }
    });

    test(`null body rows and cells styling works`, async ({ page }) => {
      const container = page.getByTestId("null style model container");
      const tbody = container.locator("tbody");
      for (let displayIndex = 0; displayIndex < 2; displayIndex++) {
        const tr = tbody.locator(`tr[aria-rowindex="${displayIndex + 5}"]`);
        await expect(tr).toHaveClass("");
        for (let colIndex = 0; colIndex < 2; colIndex++) {
          const td = tr.locator(`td[aria-colindex="${colIndex + 2}"]`);
          await expect(td).toHaveClass("");
        }
      }
    });

    test(`select column control styling works`, async ({ page }) => {
      const container = page.getByTestId("complete style model container");
      const tbody = container.locator("tbody");
      for (let displayIndex = 0; displayIndex < 2; displayIndex++) {
        const tr = tbody.locator(`tr[aria-rowindex="${displayIndex + 5}"]`);
        const origIndex = displayIndexToOrigIndex[displayIndex as 0 | 1];
        const td = tr.locator('td[aria-colindex="1"]');
        await expect(td).toHaveClass(
          [
            `main-table-row-select-call-td-test-class-row-id-${origIndex}`,
            `main-table-row-select-call-td-test-class-display-index-${displayIndex}`,
          ].join(" "),
        );
        const input = td.getByRole("checkbox");
        await expect(input).toHaveClass(
          [
            `main-table-row-select-input-test-class-row-id-${origIndex}`,
            `main-table-row-select-input-test-class-display-index-${displayIndex}`,
          ].join(" "),
        );
      }
    });

    test(`null select column control styling works`, async ({ page }) => {
      const container = page.getByTestId("null style model container");
      const tbody = container.locator("tbody");
      for (let displayIndex = 0; displayIndex < 2; displayIndex++) {
        const tr = tbody.locator(`tr[aria-rowindex="${displayIndex + 5}"]`);
        const td = tr.locator('td[aria-colindex="1"]');
        await expect(td).toHaveClass("");
        const input = td.getByRole("checkbox");
        await expect(input).toHaveClass("");
      }
    });

    test(`edit control styling works`, async ({ page }) => {
      const container = page.getByTestId("complete style model container");
      const tbody = container.locator("tbody");
      for (let displayIndex = 0; displayIndex < 2; displayIndex++) {
        const tr = tbody.locator(`tr[aria-rowindex="${displayIndex + 5}"]`);
        const origIndex = displayIndexToOrigIndex[displayIndex as 0 | 1];
        const deleteButton = tr.getByRole("button", { name: "Delete" });
        const editButton = tr.getByRole("button", { name: "Edit" });
        await expect(deleteButton).toHaveClass(
          [
            `main-table-edit-delete-button-test-class-row-id-${origIndex}`,
            `main-table-edit-delete-button-test-class-display-index-${displayIndex}`,
          ].join(" "),
        );
        await expect(editButton).toHaveClass(
          [
            `main-table-edit-start-button-test-class-row-id-${origIndex}`,
            `main-table-edit-start-button-test-class-display-index-${displayIndex}`,
          ].join(" "),
        );

        await editButton.click();

        const saveButton = tr.getByRole("button", { name: "Save" });
        const cancelButton = tr.getByRole("button", { name: "Cancel" });
        await expect(saveButton).toHaveClass(
          [
            `main-table-edit-save-button-test-class-row-id-${origIndex}`,
            `main-table-edit-save-button-test-class-display-index-${displayIndex}`,
          ].join(" "),
        );
        await expect(cancelButton).toHaveClass(
          [
            `main-table-edit-cancel-button-test-class-row-id-${origIndex}`,
            `main-table-edit-cancel-button-test-class-display-index-${displayIndex}`,
          ].join(" "),
        );
        for (let colIndex = 0; colIndex < 2; colIndex++) {
          const td = tr.locator(`td[aria-colindex="${colIndex + 2}"]`);
          const input = td.locator("input");

          await expect(input).toHaveClass(
            [
              `main-table-tbody-td-input-test-class-row-id-${origIndex}-col-index-${colIndex}`,
              `main-table-tbody-td-input-test-class-display-index-${displayIndex}-col-index-${colIndex}`,
            ].join(" "),
          );
        }

        const editColTd = tr.locator('td[aria-colindex="4"]');
        await expect(editColTd).toHaveClass(
          [
            `main-table-edit-col-td-test-class-row-id-${origIndex}`,
            `main-table-edit-col-td-test-class-display-index-${displayIndex}`,
          ].join(" "),
        );
      }
    });

    test(`null edit control styling works`, async ({ page }) => {
      const container = page.getByTestId("null style model container");
      const tbody = container.locator("tbody");
      for (let displayIndex = 0; displayIndex < 2; displayIndex++) {
        const tr = tbody.locator(`tr[aria-rowindex="${displayIndex + 5}"]`);
        const deleteButton = tr.getByRole("button", { name: "Delete" });
        const editButton = tr.getByRole("button", { name: "Edit" });
        await expect(deleteButton).toHaveClass("btn btn-secondary");
        await expect(editButton).toHaveClass("btn btn-primary");

        await editButton.click();

        const saveButton = tr.getByRole("button", { name: "Save" });
        const cancelButton = tr.getByRole("button", { name: "Cancel" });
        await expect(saveButton).toHaveClass("btn btn-primary");
        await expect(cancelButton).toHaveClass("btn btn-secondary");
        for (let colIndex = 0; colIndex < 2; colIndex++) {
          const td = tr.locator(`td[aria-colindex="${colIndex + 2}"]`);
          const input = td.locator("input");

          await expect(input).toHaveClass("form-control");
        }

        const editColTd = tr.locator('td[aria-colindex="4"]');
        await expect(editColTd).toHaveClass("");
      }
    });
  });
});
