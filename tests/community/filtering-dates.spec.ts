import { test } from "@playwright/test";
import { validateGridContents } from "../util";

test.beforeEach(async ({ page }) => {
  await page.goto("filtering/dates");
});

const getTestIdVariants: (testIdPrefix: string) => string[] = (
  testIdPrefix,
) => [`${testIdPrefix}-controlled`, `${testIdPrefix}-uncontrolled`];

test("start date filter works correctly", async ({ page }) => {
  const testIdPrefix = "start date grid container";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const container = page.getByTestId(testId);

    const gridTable = container.locator('table[aria-rowcount="4"]');
    const tbody = gridTable.locator("tbody");
    const expectedInitialContents: string[][] = [
      ["2023-01-15"],
      ["2023-06-30"],
      ["2024-03-20"],
    ];
    await validateGridContents(tbody, expectedInitialContents);

    await container
      .getByRole("button", { name: "Show Filter Options" })
      .click();
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
  }
});

test("end date filter works correctly", async ({ page }) => {
  const testIdPrefix = "end date grid container";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const container = page.getByTestId(testId);

    const gridTable = container.locator('table[aria-rowcount="4"]');
    const tbody = gridTable.locator("tbody");
    const expectedInitialContents: string[][] = [
      ["2022-12-25"],
      ["2023-01-15"],
      ["2023-06-30"],
    ];
    await validateGridContents(tbody, expectedInitialContents);

    await container
      .getByRole("button", { name: "Show Filter Options" })
      .click();
    await container
      .locator('input[aria-label="Date Column Column Filter End Date"]')
      .fill("2022-12-31");
    await container.getByRole("button", { name: "Submit" }).click();

    const newGridTable = container.locator('table[aria-rowcount="2"]');
    const expectedSubsequentContents: string[][] = [["2022-12-25"]];
    const newTbody = newGridTable.locator("tbody");
    await validateGridContents(newTbody, expectedSubsequentContents);
  }
});

test("between dates filter works correctly", async ({ page }) => {
  const testIdPrefix = "between dates grid container";
  for (const testId of getTestIdVariants(testIdPrefix)) {
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

    await container
      .getByRole("button", { name: "Show Filter Options" })
      .click();
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
  }
});

test("start datetime filter works correctly", async ({ page }) => {
  const testIdPrefix = "start datetime grid container";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const container = page.getByTestId(testId);

    const gridTable = container.locator('table[aria-rowcount="4"]');
    const tbody = gridTable.locator("tbody");
    const expectedInitialContents: string[][] = [
      ["2023-01-15T10:00"],
      ["2023-01-15T20:00"],
      ["2024-04-20T00:00"],
    ];
    await validateGridContents(tbody, expectedInitialContents);

    await container
      .getByRole("button", { name: "Show Filter Options" })
      .click();
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
  }
});

test("end datetime filter works correctly", async ({ page }) => {
  const testIdPrefix = "end datetime grid container";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const container = page.getByTestId(testId);

    const gridTable = container.locator('table[aria-rowcount="5"]');
    const tbody = gridTable.locator("tbody");
    const expectedInitialContents: string[][] = [
      ["2022-12-25T23:59"],
      ["2023-01-15T10:00"],
      ["2023-01-15T20:00"],
      ["2024-04-20T00:00"],
    ];
    await validateGridContents(tbody, expectedInitialContents);

    await container
      .getByRole("button", { name: "Show Filter Options" })
      .click();
    await container
      .locator('input[aria-label="Datetime Column Column Filter End Date"]')
      .fill("2022-12-26T00:00");
    await container.getByRole("button", { name: "Submit" }).click();

    const newGridTable = container.locator('table[aria-rowcount="2"]');
    const expectedSubsequentContents: string[][] = [["2022-12-25T23:59"]];
    const newTbody = newGridTable.locator("tbody");
    await validateGridContents(newTbody, expectedSubsequentContents);
  }
});

test("between datetimes filter works correctly", async ({ page }) => {
  const testIdPrefix = "between datetimes grid container";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const container = page.getByTestId(testId);

    const gridTable = container.locator('table[aria-rowcount="4"]');
    const tbody = gridTable.locator("tbody");
    const expectedInitialContents: string[][] = [
      ["2023-01-15T10:00"],
      ["2023-01-15T20:00"],
      ["2024-04-20T00:00"],
    ];
    await validateGridContents(tbody, expectedInitialContents);

    await container
      .getByRole("button", { name: "Show Filter Options" })
      .click();
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
  }
});
