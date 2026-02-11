import { expect, test } from "@playwright/test";
import { validateGridContents } from "./util";

test.beforeEach(async ({ page }) => {
  await page.goto("filtering");
});

test("less than number filter works correctly", async ({ page }) => {
  const container = page.getByTestId("number less than grid container");

  const gridTable = container.locator('table[aria-rowcount="4"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [["-1"], ["0"], ["0.99999"]];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("button", { name: "Show Filter Options" }).click();
  await container
    .getByRole("spinbutton", { name: "Number Column Column Filter Value" })
    .fill("0");
  await container.getByRole("button", { name: "Submit" }).click();

  const newGridTable = container.locator('table[aria-rowcount="2"]');
  const expectedSubsequentContents: string[][] = [["-1"]];
  const newTbody = newGridTable.locator("tbody");
  await validateGridContents(newTbody, expectedSubsequentContents);
});

test("greater than number filter works correctly", async ({ page }) => {
  const container = page.getByTestId("number greater than grid container");

  const gridTable = container.locator('table[aria-rowcount="2"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [["1.00001"]];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("button", { name: "Show Filter Options" }).click();
  await container
    .getByRole("spinbutton", { name: "Number Column Column Filter Value" })
    .fill("0");
  await container.getByRole("button", { name: "Submit" }).click();

  const newGridTable = container.locator('table[aria-rowcount="4"]');
  const expectedSubsequentContents: string[][] = [
    ["0.99999"],
    ["1"],
    ["1.00001"],
  ];
  const newTbody = newGridTable.locator("tbody");
  await validateGridContents(newTbody, expectedSubsequentContents);
});

test("equals number filter works correctly", async ({ page }) => {
  const container = page.getByTestId("number equals grid container");

  const gridTable = container.locator('table[aria-rowcount="2"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [["1"]];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("button", { name: "Show Filter Options" }).click();
  await container
    .getByRole("spinbutton", { name: "Number Column Column Filter Value" })
    .fill("-1");
  await container.getByRole("button", { name: "Submit" }).click();

  const expectedSubsequentContents: string[][] = [["-1"]];
  const newTbody = gridTable.locator("tbody");
  await validateGridContents(newTbody, expectedSubsequentContents);
});

test("less than or equals number filter works correctly", async ({ page }) => {
  const container = page.getByTestId("number leq grid container");

  const gridTable = container.locator('table[aria-rowcount="5"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [
    ["-1"],
    ["0"],
    ["0.99999"],
    ["1"],
  ];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("button", { name: "Show Filter Options" }).click();
  await container
    .getByRole("spinbutton", { name: "Number Column Column Filter Value" })
    .fill("0");
  await container.getByRole("button", { name: "Submit" }).click();

  const newGridTable = container.locator('table[aria-rowcount="3"]');
  const expectedSubsequentContents: string[][] = [["-1"], ["0"]];
  const newTbody = newGridTable.locator("tbody");
  await validateGridContents(newTbody, expectedSubsequentContents);
});

test("greater than or equals number filter works correctly", async ({
  page,
}) => {
  const container = page.getByTestId("number geq grid container");

  const gridTable = container.locator('table[aria-rowcount="3"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [["1"], ["1.00001"]];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("button", { name: "Show Filter Options" }).click();
  await container
    .getByRole("spinbutton", { name: "Number Column Column Filter Value" })
    .fill("0");
  await container.getByRole("button", { name: "Submit" }).click();

  const newGridTable = container.locator('table[aria-rowcount="5"]');
  const expectedSubsequentContents: string[][] = [
    ["0"],
    ["0.99999"],
    ["1"],
    ["1.00001"],
  ];
  const newTbody = newGridTable.locator("tbody");
  await validateGridContents(newTbody, expectedSubsequentContents);
});

test("contains string filter works correctly", async ({ page }) => {
  const container = page.getByTestId("string contains grid container");

  const gridTable = container.locator('table[aria-rowcount="3"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [["foobar"], ["foobarfizzbuzz"]];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("button", { name: "Show Filter Options" }).click();
  await container
    .getByRole("textbox", { name: "String Column Column Filter Value" })
    .fill("fizz");
  await container.getByRole("button", { name: "Submit" }).click();

  const expectedSubsequentContents: string[][] = [
    ["fizzbuzz"],
    ["foobarfizzbuzz"],
  ];
  const newTbody = gridTable.locator("tbody");
  await validateGridContents(newTbody, expectedSubsequentContents);
});

test("starts with string filter works correctly", async ({ page }) => {
  const container = page.getByTestId("string starts with grid container");

  const gridTable = container.locator('table[aria-rowcount="3"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [["foobar"], ["foobarfizzbuzz"]];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("button", { name: "Show Filter Options" }).click();
  await container
    .getByRole("textbox", { name: "String Column Column Filter Value" })
    .fill("fizz");
  await container.getByRole("button", { name: "Submit" }).click();

  const newGridTable = container.locator('table[aria-rowcount="2"]');
  const expectedSubsequentContents: string[][] = [["fizzbuzz"]];
  const newTbody = newGridTable.locator("tbody");
  await validateGridContents(newTbody, expectedSubsequentContents);
});

test("start date filter works correctly", async ({ page }) => {
  const container = page.getByTestId("start date grid container");

  const gridTable = container.locator('table[aria-rowcount="4"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [
    ["2023-01-15"],
    ["2023-06-30"],
    ["2024-03-20"],
  ];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("button", { name: "Show Filter Options" }).click();
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

test("end date filter works correctly", async ({ page }) => {
  const container = page.getByTestId("end date grid container");

  const gridTable = container.locator('table[aria-rowcount="4"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [
    ["2022-12-25"],
    ["2023-01-15"],
    ["2023-06-30"],
  ];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("button", { name: "Show Filter Options" }).click();
  await container
    .locator('input[aria-label="Date Column Column Filter End Date"]')
    .fill("2022-12-31");
  await container.getByRole("button", { name: "Submit" }).click();

  const newGridTable = container.locator('table[aria-rowcount="2"]');
  const expectedSubsequentContents: string[][] = [["2022-12-25"]];
  const newTbody = newGridTable.locator("tbody");
  await validateGridContents(newTbody, expectedSubsequentContents);
});

test("between dates filter works correctly", async ({ page }) => {
  const container = page.getByTestId("between dates grid container");

  const gridTable = container.locator('table[aria-rowcount="5"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [
    ["2022-12-25"],
    ["2023-01-15"],
    ["2023-06-30"],
    ["2024-03-20"],
  ];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("button", { name: "Show Filter Options" }).click();
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

test("start datetime filter works correctly", async ({ page }) => {
  const container = page.getByTestId("start datetime grid container");

  const gridTable = container.locator('table[aria-rowcount="4"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [
    ["2023-01-15T10:00"],
    ["2023-01-15T20:00"],
    ["2024-04-20T00:00"],
  ];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("button", { name: "Show Filter Options" }).click();
  await container
    .locator('input[aria-label="Datetime Column Column Filter Start Date"]')
    .fill("2023-01-15T10:01");
  await container.getByRole("button", { name: "Submit" }).click();

  const newGridTable = container.locator('table[aria-rowcount="3"]');
  const expectedSubsequentContents: string[][] = [
    ["2023-01-15T20:00"],
    ["2024-04-20T00:00"],
  ];
  const newTbody = newGridTable.locator("tbody");
  await validateGridContents(newTbody, expectedSubsequentContents);
});

test("end datetime filter works correctly", async ({ page }) => {
  const container = page.getByTestId("end datetime grid container");

  const gridTable = container.locator('table[aria-rowcount="5"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [
    ["2022-12-25T23:59"],
    ["2023-01-15T10:00"],
    ["2023-01-15T20:00"],
    ["2024-04-20T00:00"],
  ];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("button", { name: "Show Filter Options" }).click();
  await container
    .locator('input[aria-label="Datetime Column Column Filter End Date"]')
    .fill("2022-12-26T00:00");
  await container.getByRole("button", { name: "Submit" }).click();

  const newGridTable = container.locator('table[aria-rowcount="2"]');
  const expectedSubsequentContents: string[][] = [["2022-12-25T23:59"]];
  const newTbody = newGridTable.locator("tbody");
  await validateGridContents(newTbody, expectedSubsequentContents);
});

test("between datetimes filter works correctly", async ({ page }) => {
  const container = page.getByTestId("between datetimes grid container");

  const gridTable = container.locator('table[aria-rowcount="4"]');
  const tbody = gridTable.locator("tbody");
  const expectedInitialContents: string[][] = [
    ["2023-01-15T10:00"],
    ["2023-01-15T20:00"],
    ["2024-04-20T00:00"],
  ];
  await validateGridContents(tbody, expectedInitialContents);

  await container.getByRole("button", { name: "Show Filter Options" }).click();
  await container
    .locator('input[aria-label="Datetime Column Column Filter Start Date"]')
    .fill("2023-01-15T09:45");
  await container
    .locator('input[aria-label="Datetime Column Column Filter End Date"]')
    .fill("2024-04-19T00:00");
  await container.getByRole("button", { name: "Submit" }).click();

  const newGridTable = container.locator('table[aria-rowcount="3"]');
  const expectedSubsequentContents: string[][] = [
    ["2023-01-15T10:00"],
    ["2023-01-15T20:00"],
  ];
  const newTbody = newGridTable.locator("tbody");
  await validateGridContents(newTbody, expectedSubsequentContents);
});

test("combined filter and toggles work correctly", async ({ page }) => {
  const container = page.getByTestId("combined grid container");

  let gridTable = container.locator('table[aria-rowcount="1"]');
  await expect(gridTable).toBeVisible();

  await container.getByRole("button", { name: "Show Filter Options" }).click();

  // Uncheck string filter

  await container
    .locator('input[aria-label="String Column Column Filter Toggle"]')
    .uncheck();
  await container.getByRole("button", { name: "Submit" }).click();

  gridTable = container.locator('table[aria-rowcount="2"]');
  await expect(gridTable).toBeVisible();

  // Uncheck number filter

  await container
    .locator('input[aria-label="Number Column Column Filter Toggle"]')
    .uncheck();
  await container.getByRole("button", { name: "Submit" }).click();

  gridTable = container.locator('table[aria-rowcount="3"]');
  await expect(gridTable).toBeVisible();

  // Uncheck date filter

  await container
    .locator('input[aria-label="Date Column Column Filter Toggle"]')
    .uncheck();
  await container.getByRole("button", { name: "Submit" }).click();

  gridTable = container.locator('table[aria-rowcount="4"]');
  await expect(gridTable).toBeVisible();

  // Uncheck datetime filter

  await container
    .locator('input[aria-label="Datetime Column Column Filter Toggle"]')
    .uncheck();
  await container.getByRole("button", { name: "Submit" }).click();

  gridTable = container.locator('table[aria-rowcount="5"]');
  await expect(gridTable).toBeVisible();
});
