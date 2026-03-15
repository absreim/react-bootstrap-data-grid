import { expect, test, Page } from "@playwright/test";
import * as fs from "node:fs";
import { Locator } from "playwright-core";
import Papa from "papaparse";

test.beforeEach(async ({ page }) => {
  await page.goto("export");
});

const openExport: (page: Page, testId: string) => Promise<Locator> = async (
  page,
  testId,
) => {
  const container = page.getByTestId(testId);
  const toolbar = container.getByRole("toolbar");
  await toolbar.getByRole("button", { name: "Export" }).click();
  return container;
};

const downloadAndRead: (
  page: Page,
  container: Locator,
) => Promise<string> = async (page, container) => {
  const downloadPromise = page.waitForEvent("download");
  await container.getByRole("button", { name: "Submit" }).click();
  const download = await downloadPromise;

  return fs.readFileSync(await download.path(), "utf8");
};

test("unavailable options are disabled", async ({ page }) => {
  const container = await openExport(page, "options disabled test container");

  const filteredRowsOption = container.getByRole("radio", {
    name: "After filters applied (filtering disabled)",
  });
  await expect(filteredRowsOption).toBeDisabled();
  const paginatedRowsOption = container.getByRole("radio", {
    name: "Current page only (pagination disabled)",
  });
  await expect(paginatedRowsOption).toBeDisabled();
  const formattedOption = container.getByRole("radio", {
    name: "Apply formatters to data (no formatters defined)",
  });
  await expect(formattedOption).toBeDisabled();
});

const unformattedJsonOutput = [
  {
    id: 0,
    data: {
      strCol: "bc",
      numCol: 2,
      dateCol: "2022-01-01",
      datetimeCol: "2022-01-01T01:01",
    },
  },
  {
    id: 1,
    data: {
      strCol: "adef",
      numCol: 0,
      dateCol: "2023-02-02",
      datetimeCol: "2023-02-02T02:02",
    },
  },
  {
    id: 2,
    data: {
      strCol: "aghi",
      numCol: 3,
      dateCol: "2025-04-04",
      datetimeCol: "2024-03-03T03:03",
    },
  },
  {
    id: 3,
    data: {
      strCol: "ajkl",
      numCol: 4,
      dateCol: "2024-03-03",
      datetimeCol: "2025-04-04T04:04",
    },
  },
];

test("unformatted JSON export works correctly", async ({ page }) => {
  const container = await openExport(page, "options enabled test container");

  const fileContents = await downloadAndRead(page, container);
  const fileJson = JSON.parse(fileContents);
  expect(fileJson).toEqual(unformattedJsonOutput);
});

test("filtered JSON export works correctly", async ({ page }) => {
  const container = await openExport(page, "options enabled test container");

  const filteredRowsOption = container.getByRole("radio", {
    name: "After filters applied",
  });
  await filteredRowsOption.check();

  const fileContents = await downloadAndRead(page, container);
  const fileJson = JSON.parse(fileContents);
  expect(fileJson).toEqual(unformattedJsonOutput.slice(0, 3));
});

test("paged JSON export works correctly", async ({ page }) => {
  const container = await openExport(page, "options enabled test container");

  const paginatedRowsOption = container.getByRole("radio", {
    name: "Current page only",
  });
  await paginatedRowsOption.check();

  const fileContents = await downloadAndRead(page, container);
  const fileJson = JSON.parse(fileContents);
  expect(fileJson).toEqual(unformattedJsonOutput.slice(0, 2));
});

const formattedJsonOutput = [
  {
    id: 0,
    data: {
      strCol: "2",
      numCol: "non-zero",
      dateCol: "1640995200000",
      datetimeCol: "1640966460000",
    },
  },
  {
    id: 1,
    data: {
      strCol: "4",
      numCol: "zero",
      dateCol: "1675296000000",
      datetimeCol: "1675270920000",
    },
  },
  {
    id: 2,
    data: {
      strCol: "4",
      numCol: "non-zero",
      dateCol: "1743724800000",
      datetimeCol: "1709402580000",
    },
  },
  {
    id: 3,
    data: {
      strCol: "4",
      numCol: "non-zero",
      dateCol: "1709424000000",
      datetimeCol: "1743707040000",
    },
  },
];

test("formatted JSON export works correctly", async ({ page }) => {
  const container = await openExport(page, "options enabled test container");

  const formattedOption = container.getByRole("radio", {
    name: "Apply formatters to data",
  });
  await formattedOption.check();

  const fileContents = await downloadAndRead(page, container);
  const fileJson = JSON.parse(fileContents);
  expect(fileJson).toEqual(formattedJsonOutput);
});

const parsedUnformattedCsvOutput = [
  {
    id: "0",
    strCol: "bc",
    numCol: "2",
    dateCol: "2022-01-01",
    datetimeCol: "2022-01-01T01:01",
  },
  {
    id: "1",
    strCol: "adef",
    numCol: "0",
    dateCol: "2023-02-02",
    datetimeCol: "2023-02-02T02:02",
  },
  {
    id: "2",
    strCol: "aghi",
    numCol: "3",
    dateCol: "2025-04-04",
    datetimeCol: "2024-03-03T03:03",
  },
  {
    id: "3",
    strCol: "ajkl",
    numCol: "4",
    dateCol: "2024-03-03",
    datetimeCol: "2025-04-04T04:04",
  },
];

test("unformatted CSV export works correctly", async ({ page }) => {
  const container = await openExport(page, "options enabled test container");

  const csvOption = container.getByRole("radio", {
    name: "CSV",
  });
  await csvOption.check();

  const fileContents = await downloadAndRead(page, container);
  const data = Papa.parse(fileContents, { header: true }).data;
  expect(data).toEqual(parsedUnformattedCsvOutput);
});

test("custom styles work correctly", async ({ page }) => {
  const container = await openExport(page, "styles test container");
  const form = container.locator("form");

  const divs = await form.locator("div").all();
  for (const div of divs) {
    await expect(div).toHaveClass("radio-container-test-class");
  }

  const legends = await form.locator("legend").all();
  for (const legend of legends) {
    await expect(legend).toHaveClass("legend-test-class");
  }

  const labels = await form.locator("label").all();
  for (const label of labels) {
    await expect(label).toHaveClass("radio-label-test-class");
  }

  const inputs = await form.getByRole("radio").all();
  for (const input of inputs) {
    await expect(input).toHaveClass("radio-input-test-class");
  }

  const submit = form.getByRole("button");
  await expect(submit).toHaveClass("submit-button-test-class");
});
