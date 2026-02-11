import { test, expect } from "@playwright/test";
import { validateGridContents } from "./util";

test.beforeEach(async ({ page }) => {
  await page.goto("editing");
});

test("deleting a row works as expected", async ({ page }) => {
  const editableGridContainer = page.getByTestId("editable grid container");
  const firstRow = editableGridContainer.locator(
    'tbody > tr[aria-rowindex="2"]',
  );
  const deleteButton = firstRow.getByRole("button", { name: "Delete" });
  await deleteButton.click();

  await expect(
    editableGridContainer.locator('table[aria-rowcount="3"]'),
  ).toBeVisible();
});

test("editing a row works as expected", async ({ page }) => {
  const editableGridContainer = page.getByTestId("editable grid container");
  const secondRow = editableGridContainer.locator(
    'tbody > tr[aria-rowindex="3"]',
  );
  const editButton = secondRow.getByRole("button", { name: "Edit" });
  await editButton.click();

  const strInput = secondRow.getByRole("textbox", { name: "String Column" });
  await strInput.fill("Edited Row");
  const numInput = secondRow.getByRole("spinbutton", { name: "Number Column" });
  await numInput.fill("-1");
  const dateInput = secondRow.getByRole("textbox", { name: "Date Column" });
  await dateInput.fill("2027-12-31");
  const datetimeInput = secondRow.getByRole("textbox", {
    name: "Datetime Column",
  });
  await datetimeInput.fill("2027-12-31T23:59");
  const saveButton = secondRow.getByRole("button", { name: "Save" });
  await saveButton.click();

  const expectedContents: string[][] = [
    ["First Row", "1", "2026-01-01", "2026-01-01T01:00"],
    ["Edited Row", "-1", "2027-12-31", "2027-12-31T23:59"],
    ["Third Row", "3", "2026-01-03", "2026-01-03T03:00"],
  ];
  const tbody = editableGridContainer.locator("tbody");
  await validateGridContents(tbody, expectedContents);
});
