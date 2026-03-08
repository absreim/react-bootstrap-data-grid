import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("sorting");
});

const getTestIdVariants: (testId: string) => string[] = (testId) => [
  `${testId}-controlled`,
  `${testId}-uncontrolled`,
];

test("unsortable column is sorted if initial model calls for it", async ({
  page,
}) => {
  const testIdPrefix = "sorted unsortable column test case";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const unsortableSortedContainer = page.getByTestId(testId);

    const firstRowCell = unsortableSortedContainer.locator(
      'tr[aria-rowindex="2"] > td[aria-colindex="5"]',
    );
    const secondRowCell = unsortableSortedContainer.locator(
      'tr[aria-rowindex="3"] > td[aria-colindex="5"]',
    );
    const thirdRowCell = unsortableSortedContainer.locator(
      'tr[aria-rowindex="4"] > td[aria-colindex="5"]',
    );

    await expect(firstRowCell).toHaveText("z");
    await expect(secondRowCell).toHaveText("y");
    await expect(thirdRowCell).toHaveText("x");
  }
});

test("unsorted column becomes sorted after clicking on the header cell", async ({
  page,
}) => {
  const testIdPrefix = "unsorted to sorted test case";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const unsortedToSortedContainer = page.getByTestId(
      testId,
    );

    const strColHeaderCell = unsortedToSortedContainer.getByRole(
      "columnheader",
      {
        name: "String Column",
        exact: true,
      },
    );
    await strColHeaderCell.click();

    const firstRowCell = unsortedToSortedContainer.locator(
      'tr[aria-rowindex="2"] > td[aria-colindex="1"]',
    );
    const secondRowCell = unsortedToSortedContainer.locator(
      'tr[aria-rowindex="3"] > td[aria-colindex="1"]',
    );
    const thirdRowCell = unsortedToSortedContainer.locator(
      'tr[aria-rowindex="4"] > td[aria-colindex="1"]',
    );

    await expect(firstRowCell).toHaveText("a");
    await expect(secondRowCell).toHaveText("b");
    await expect(thirdRowCell).toHaveText("c");
  }
});

test("asc sorted column becomes desc sorted after clicking on the header cell", async ({
  page,
}) => {
  const testIdPrefix = "ascending to descending test case";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const ascToDescContainer = page.getByTestId(testId);

    const strColHeaderCell = ascToDescContainer.locator(
      'tr[aria-rowindex="1"] > th[aria-colindex="1"]',
    );
    await strColHeaderCell.click();

    const firstRowCell = ascToDescContainer.locator(
      'tr[aria-rowindex="2"] > td[aria-colindex="1"]',
    );
    const secondRowCell = ascToDescContainer.locator(
      'tr[aria-rowindex="3"] > td[aria-colindex="1"]',
    );
    const thirdRowCell = ascToDescContainer.locator(
      'tr[aria-rowindex="4"] > td[aria-colindex="1"]',
    );

    // In Chrome, this name shows up as "String Column (sorted descending)",
    // with the space before the left parenthesis
    await expect(strColHeaderCell).toHaveAccessibleName(
      "String Column(sorted descending)",
    );

    await expect(firstRowCell).toHaveText("c");
    await expect(secondRowCell).toHaveText("b");
    await expect(thirdRowCell).toHaveText("a");
  }
});

test("desc sorted column becomes unsorted after clicking on the header cell", async ({
  page,
}) => {
  const testIdPrefix = "descending to unsorted test case";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const descToUnsortedContainer = page.getByTestId(testId);

    const strColHeaderCell = descToUnsortedContainer.locator(
      'tr[aria-rowindex="1"] > th[aria-colindex="1"]',
    );
    await strColHeaderCell.click();

    const firstRowCell = descToUnsortedContainer.locator(
      'tr[aria-rowindex="2"] > td[aria-colindex="1"]',
    );
    const secondRowCell = descToUnsortedContainer.locator(
      'tr[aria-rowindex="3"] > td[aria-colindex="1"]',
    );
    const thirdRowCell = descToUnsortedContainer.locator(
      'tr[aria-rowindex="4"] > td[aria-colindex="1"]',
    );

    await expect(strColHeaderCell).toHaveAccessibleName("String Column");

    await expect(firstRowCell).toHaveText("a");
    await expect(secondRowCell).toHaveText("c");
    await expect(thirdRowCell).toHaveText("b");
  }
});

test("numbers are sorted numerically rather than lexicographically", async ({
  page,
}) => {
  const testIdPrefix = "number sort test case";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const numberSortContainer = page.getByTestId(testId);

    const firstRowCell = numberSortContainer.locator(
      'tr[aria-rowindex="2"] > td[aria-colindex="2"]',
    );
    const secondRowCell = numberSortContainer.locator(
      'tr[aria-rowindex="3"] > td[aria-colindex="2"]',
    );
    const thirdRowCell = numberSortContainer.locator(
      'tr[aria-rowindex="4"] > td[aria-colindex="2"]',
    );

    await expect(firstRowCell).toHaveText("1");
    await expect(secondRowCell).toHaveText("2");
    await expect(thirdRowCell).toHaveText("10");
  }
});

test("dates are sorted by value rather than formatted string", async ({
  page,
}) => {
  const testIdPrefix = "date sort test case";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const numberSortContainer = page.getByTestId(testId);

    const firstRowCell = numberSortContainer.locator(
      'tr[aria-rowindex="2"] > td[aria-colindex="3"]',
    );
    const secondRowCell = numberSortContainer.locator(
      'tr[aria-rowindex="3"] > td[aria-colindex="3"]',
    );
    const thirdRowCell = numberSortContainer.locator(
      'tr[aria-rowindex="4"] > td[aria-colindex="3"]',
    );

    await expect(firstRowCell).toHaveText("1");
    await expect(secondRowCell).toHaveText("2");
    await expect(thirdRowCell).toHaveText("10");
  }
});

test("datetimes are sorted by value rather than formatted string", async ({
  page,
}) => {
  const testIdPrefix = "datetime sort test case";
  for (const testId of getTestIdVariants(testIdPrefix)) {
    const numberSortContainer = page.getByTestId(testId);

    const firstRowCell = numberSortContainer.locator(
      'tr[aria-rowindex="2"] > td[aria-colindex="4"]',
    );
    const secondRowCell = numberSortContainer.locator(
      'tr[aria-rowindex="3"] > td[aria-colindex="4"]',
    );
    const thirdRowCell = numberSortContainer.locator(
      'tr[aria-rowindex="4"] > td[aria-colindex="4"]',
    );

    await expect(firstRowCell).toHaveText("1");
    await expect(secondRowCell).toHaveText("2");
    await expect(thirdRowCell).toHaveText("10");
  }
});
