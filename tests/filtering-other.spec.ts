import { test } from "@playwright/test";
import { validateGridContents } from "./util";

test.beforeEach(async ({ page }) => {
  await page.goto("filtering/other");
});

const getTestIdVariants: (testIdPrefix: string) => string[] = (
  testIdPrefix,
) => [`${testIdPrefix}-controlled`, `${testIdPrefix}-uncontrolled`];

test("less than number filter works correctly", async ({ page }) => {
  const testIdPrefix = "number less than grid container";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const container = page.getByTestId(testId);

    const gridTable = container.locator('table[aria-rowcount="4"]');
    const tbody = gridTable.locator("tbody");
    const expectedInitialContents: string[][] = [["-1"], ["0"], ["0.99999"]];
    await validateGridContents(tbody, expectedInitialContents);

    await container
      .getByRole("button", { name: "Show Filter Options" })
      .click();
    await container
      .getByRole("spinbutton", { name: "Number Column Column Filter Value" })
      .fill("0");
    await container.getByRole("button", { name: "Submit" }).click();

    const newGridTable = container.locator('table[aria-rowcount="2"]');
    const expectedSubsequentContents: string[][] = [["-1"]];
    const newTbody = newGridTable.locator("tbody");
    await validateGridContents(newTbody, expectedSubsequentContents);
  }
});

test("greater than number filter works correctly", async ({ page }) => {
  const testIdPrefix = "number greater than grid container";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const container = page.getByTestId(testId);

    const gridTable = container.locator('table[aria-rowcount="2"]');
    const tbody = gridTable.locator("tbody");
    const expectedInitialContents: string[][] = [["1.00001"]];
    await validateGridContents(tbody, expectedInitialContents);

    await container
      .getByRole("button", { name: "Show Filter Options" })
      .click();
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
  }
});

test("equals number filter works correctly", async ({ page }) => {
  const testIdPrefix = "number equals grid container";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const container = page.getByTestId(testId);

    const gridTable = container.locator('table[aria-rowcount="2"]');
    const tbody = gridTable.locator("tbody");
    const expectedInitialContents: string[][] = [["1"]];
    await validateGridContents(tbody, expectedInitialContents);

    await container
      .getByRole("button", { name: "Show Filter Options" })
      .click();
    await container
      .getByRole("spinbutton", { name: "Number Column Column Filter Value" })
      .fill("-1");
    await container.getByRole("button", { name: "Submit" }).click();

    const expectedSubsequentContents: string[][] = [["-1"]];
    const newTbody = gridTable.locator("tbody");
    await validateGridContents(newTbody, expectedSubsequentContents);
  }
});

test("less than or equals number filter works correctly", async ({ page }) => {
  const testIdPrefix = "number leq grid container";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const container = page.getByTestId(testId);

    const gridTable = container.locator('table[aria-rowcount="5"]');
    const tbody = gridTable.locator("tbody");
    const expectedInitialContents: string[][] = [
      ["-1"],
      ["0"],
      ["0.99999"],
      ["1"],
    ];
    await validateGridContents(tbody, expectedInitialContents);

    await container
      .getByRole("button", { name: "Show Filter Options" })
      .click();
    await container
      .getByRole("spinbutton", { name: "Number Column Column Filter Value" })
      .fill("0");
    await container.getByRole("button", { name: "Submit" }).click();

    const newGridTable = container.locator('table[aria-rowcount="3"]');
    const expectedSubsequentContents: string[][] = [["-1"], ["0"]];
    const newTbody = newGridTable.locator("tbody");
    await validateGridContents(newTbody, expectedSubsequentContents);
  }
});

test("greater than or equals number filter works correctly", async ({
  page,
}) => {
  const testIdPrefix = "number geq grid container";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const container = page.getByTestId(testId);

    const gridTable = container.locator('table[aria-rowcount="3"]');
    const tbody = gridTable.locator("tbody");
    const expectedInitialContents: string[][] = [["1"], ["1.00001"]];
    await validateGridContents(tbody, expectedInitialContents);

    await container
      .getByRole("button", { name: "Show Filter Options" })
      .click();
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
  }
});

test("contains string filter works correctly", async ({ page }) => {
  const testIdPrefix = "string contains grid container";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const container = page.getByTestId(testId);

    const gridTable = container.locator('table[aria-rowcount="3"]');
    const tbody = gridTable.locator("tbody");
    const expectedInitialContents: string[][] = [
      ["foobar"],
      ["foobarfizzbuzz"],
    ];
    await validateGridContents(tbody, expectedInitialContents);

    await container
      .getByRole("button", { name: "Show Filter Options" })
      .click();
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
  }
});

test("starts with string filter works correctly", async ({ page }) => {
  const testIdPrefix = "string starts with grid container";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const container = page.getByTestId(testId);

    const gridTable = container.locator('table[aria-rowcount="3"]');
    const tbody = gridTable.locator("tbody");
    const expectedInitialContents: string[][] = [
      ["foobar"],
      ["foobarfizzbuzz"],
    ];
    await validateGridContents(tbody, expectedInitialContents);

    await container
      .getByRole("button", { name: "Show Filter Options" })
      .click();
    await container
      .getByRole("textbox", { name: "String Column Column Filter Value" })
      .fill("fizz");
    await container.getByRole("button", { name: "Submit" }).click();

    const newGridTable = container.locator('table[aria-rowcount="2"]');
    const expectedSubsequentContents: string[][] = [["fizzbuzz"]];
    const newTbody = newGridTable.locator("tbody");
    await validateGridContents(newTbody, expectedSubsequentContents);
  }
});
