import { expect, Locator, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid/pagination");
});

test("pagination component alignment works correctly", async ({ page }) => {
  const paginationContainer = page.getByTestId("rdbg-pagination-ui-container");
  await expect(paginationContainer).toHaveCSS("justify-content", "right");

  const alignmentGroup = page.getByRole("group", {
    name: "Pagination Component Alignment",
  });
  const leftOption = alignmentGroup.getByRole("radio", { name: "Left" });
  await leftOption.check();

  await expect(paginationContainer).toHaveCSS("justify-content", "left");

  const centerOption = alignmentGroup.getByRole("radio", { name: "Center" });
  await centerOption.check();

  await expect(paginationContainer).toHaveCSS("justify-content", "center");

  const rightOption = alignmentGroup.getByRole("radio", {
    name: "Right",
    exact: true,
  });
  await rightOption.check();

  await expect(paginationContainer).toHaveCSS("justify-content", "right");
});

const validateSpacing: (
  radioGroup: Locator,
  styledContainer: Locator,
) => Promise<void> = async (radioGroup, styledContainer) => {
  await expect(styledContainer).toHaveCSS("row-gap", "8px");

  const zeroOption = radioGroup.getByRole("radio", { name: "0" });
  await zeroOption.check();

  await expect(styledContainer).toHaveCSS("row-gap", "0px");

  const oneOption = radioGroup.getByRole("radio", { name: "1" });
  await oneOption.check();

  await expect(styledContainer).toHaveCSS("row-gap", "4px");

  const twoOption = radioGroup.getByRole("radio", {
    name: "2",
    exact: true,
  });
  await twoOption.check();

  await expect(styledContainer).toHaveCSS("row-gap", "8px");

  const threeOption = radioGroup.getByRole("radio", { name: "3" });
  await threeOption.check();

  await expect(styledContainer).toHaveCSS("row-gap", "16px");

  const fourOption = radioGroup.getByRole("radio", { name: "4" });
  await fourOption.check();

  await expect(styledContainer).toHaveCSS("row-gap", "24px");

  const fiveOption = radioGroup.getByRole("radio", { name: "5" });
  await fiveOption.check();

  await expect(styledContainer).toHaveCSS("row-gap", "48px");
};

test("pagination component spacing works correctly", async ({ page }) => {
  const paginationContainer = page.getByTestId("rdbg-pagination-ui-container");
  const paginationSpacingGroup = page.getByRole("group", {
    name: "Pagination Component Spacing",
  });

  await validateSpacing(paginationSpacingGroup, paginationContainer);
});

test("main component spacing works correctly", async ({ page }) => {
  const mainContainer = page.getByTestId("rbdg-top-level-grid-container");
  const mainSpacingGroup = page.getByRole("group", {
    name: "Main Component Spacing",
  });

  await validateSpacing(mainSpacingGroup, mainContainer);
});

const validateComponentOrder: (
  parent: Locator,
  testIds: string[],
) => Promise<void> = async (parent, testIds) => {
  const children = parent.locator("> *");
  await expect
    .poll(
      async () =>
        await children.evaluateAll((children) =>
          children.map((el) => el.getAttribute("data-testid")),
        ),
    )
    .toEqual(testIds);
};

test("top level component order works correctly", async ({ page }) => {
  const topLevelDiv = page.getByTestId("rbdg-top-level-grid-container");
  await validateComponentOrder(topLevelDiv, [
    "rbdg-grid",
    "rdbg-pagination-ui-container",
  ]);

  const topLevelOrderGroup = page.getByRole("group", {
    name: "Pagination UI Above Grid",
  });
  const trueOption = topLevelOrderGroup.getByRole("radio", { name: "True" });
  await trueOption.check();

  await validateComponentOrder(topLevelDiv, [
    "rdbg-pagination-ui-container",
    "rbdg-grid",
  ]);

  const falseOption = topLevelOrderGroup.getByRole("radio", {
    name: "False",
    exact: true,
  });
  await falseOption.check();

  await validateComponentOrder(topLevelDiv, [
    "rbdg-grid",
    "rdbg-pagination-ui-container",
  ]);
});

test("pagination component order works correctly", async ({ page }) => {
  const paginationDiv = page.getByTestId("rdbg-pagination-ui-container");
  await validateComponentOrder(paginationDiv, [
    "rbdg-page-size-selector",
    "rbdg-page-selector",
  ]);

  const pageUiOrderGroup = page.getByRole("group", {
    name: "Page Size Select after Page Num Select",
  });
  const trueOption = pageUiOrderGroup.getByRole("radio", { name: "True" });
  await trueOption.check();

  await validateComponentOrder(paginationDiv, [
    "rbdg-page-selector",
    "rbdg-page-size-selector",
  ]);

  const falseOption = pageUiOrderGroup.getByRole("radio", {
    name: "False",
    exact: true,
  });
  await falseOption.check();

  await validateComponentOrder(paginationDiv, [
    "rbdg-page-size-selector",
    "rbdg-page-selector",
  ]);
});
