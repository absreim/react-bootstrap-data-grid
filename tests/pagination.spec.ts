import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("pagination/test");
});

test("pagination component displays specified number of links", async ({
  page,
}) => {
  const evenNumButtonsContainer = page.getByTestId(
    "even number of buttons test case",
  );

  await expect(
    evenNumButtonsContainer.getByRole("link", { name: "4" }),
  ).toBeEnabled();
  await expect(
    evenNumButtonsContainer.getByRole("link", { name: "5" }),
  ).toBeEnabled();
  await expect(
    evenNumButtonsContainer.getByRole("link", { name: "6" }),
  ).toBeEnabled();
  await expect(
    evenNumButtonsContainer.getByRole("link", { name: "7" }),
  ).toBeEnabled();
});

test("pagination component displays maximum number of index links possible if there are fewer pages than specified", async ({
  page,
}) => {
  const limitedPagesContainer = page.getByTestId(
    "fewer pages than buttons test case",
  );

  await expect(
    limitedPagesContainer.getByRole("link", { name: "1" }),
  ).toBeEnabled();
  await expect(
    limitedPagesContainer.getByRole("link", { name: "2" }),
  ).toBeEnabled();
  await expect(
    limitedPagesContainer.getByRole("link", { name: "3" }),
  ).toBeEnabled();
});

test("pagination component displays same number of index buttons on either side of current index if possible", async ({
  page,
}) => {
  const symmetricalButtonsContainer = page.getByTestId(
    "symmetrical button list test case",
  );

  await expect(
    symmetricalButtonsContainer.getByRole("link", { name: "4" }),
  ).toBeEnabled();
  await expect(
    symmetricalButtonsContainer.getByRole("link", { name: "5" }),
  ).toBeEnabled();
  await expect(
    symmetricalButtonsContainer.getByRole("link", { name: "6" }),
  ).toBeEnabled();
});

test("pagination component displays specified number even if symmetry is not possible", async ({
  page,
}) => {
  const brokenSymmetryContainer = page.getByTestId("broken symmetry test case");

  await expect(
    brokenSymmetryContainer.getByRole("link", { name: "1" }),
  ).toBeEnabled();
  await expect(
    brokenSymmetryContainer.getByRole("link", { name: "2" }),
  ).toBeEnabled();
  await expect(
    brokenSymmetryContainer.getByRole("link", { name: "3" }),
  ).toBeEnabled();
  await expect(
    brokenSymmetryContainer.getByRole("link", { name: "4" }),
  ).toBeEnabled();
  await expect(
    brokenSymmetryContainer.getByRole("link", { name: "5" }),
  ).toBeEnabled();
});

test("pagination component displays a link to the first page if there isn't already an index button for it", async ({
  page,
}) => {
  const firstPageLinkContainer = page.getByTestId("first page link test case");

  await expect(
    firstPageLinkContainer.getByRole("link", { name: "First" }),
  ).toBeEnabled();
});

test("pagination component displays a link to the prev page if not already on first page", async ({
  page,
}) => {
  const prevPageLinkContainer = page.getByTestId("prev page link test case");

  await expect(
    prevPageLinkContainer.getByRole("link", { name: "Previous" }),
  ).toBeEnabled();
});

test("pagination component displays a link to the last page if not already on last page", async ({
  page,
}) => {
  const lastPageLinkContainer = page.getByTestId("last page link test case");

  await expect(
    lastPageLinkContainer.getByRole("link", { name: "Last" }),
  ).toBeEnabled();
});

test("pagination component displays a link to the next page if not already on last page", async ({
  page,
}) => {
  const nextPageLinkContainer = page.getByTestId("next page link test case");

  await expect(
    nextPageLinkContainer.getByRole("link", { name: "Next" }),
  ).toBeEnabled();
});

test("pagination component responds correctly to click on index link", async ({
  page,
}) => {
  const indexInteractionContainer = page.getByTestId(
    "index link click test case",
  );
  await indexInteractionContainer.getByRole("link", { name: "5" }).click();

  await expect(
    indexInteractionContainer
      .locator("li[aria-current=page]")
      .getByRole("link", { name: "5" }),
  ).toBeEnabled();
});

test("pagination component responds correctly to click on prev link", async ({
  page,
}) => {
  const prevInteractionContainer = page.getByTestId(
    "prev link click test case",
  );
  await prevInteractionContainer
    .getByRole("link", { name: "Previous" })
    .click();

  await expect(
    prevInteractionContainer
      .locator("li[aria-current=page]")
      .getByRole("link", { name: "1" }),
  ).toBeEnabled();
});

test("pagination component responds correctly to click on first link", async ({
  page,
}) => {
  const firstInteractionContainer = page.getByTestId(
    "first link click test case",
  );
  await firstInteractionContainer
    .getByRole("link", { name: "First" })
    .click();

  await expect(
    firstInteractionContainer
      .locator("li[aria-current=page]")
      .getByRole("link", { name: "1" }),
  ).toBeEnabled();
});

test("pagination component responds correctly to click on next link", async ({
  page,
}) => {
  const nextInteractionContainer = page.getByTestId(
    "next link click test case",
  );
  await nextInteractionContainer.getByRole("link", { name: "Next" }).click();

  await expect(
    nextInteractionContainer
      .locator("li[aria-current=page]")
      .getByRole("link", { name: "3" }),
  ).toBeEnabled();
});

test("pagination component responds correctly to click on last link", async ({
  page,
}) => {
  const lastInteractionContainer = page.getByTestId(
    "last link click test case",
  );
  await lastInteractionContainer.getByRole("link", { name: "Last" }).click();

  await expect(
    lastInteractionContainer
      .locator("li[aria-current=page]")
      .getByRole("link", { name: "10" }),
  ).toBeEnabled();
});
