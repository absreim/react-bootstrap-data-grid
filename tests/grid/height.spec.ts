import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

test("grid has height of intrinsic content when height prop unset", async ({
  page,
}) => {
  const grid = page.getByRole("grid");

  await expect(grid).toHaveCSS("height", "451px");
});

async function setHeightAndAssert(
  page: Page,
  optionName: string,
  heightPx: number,
) {
  const heightFieldset = page.getByRole("group", { name: "Height Setting" });
  const option = heightFieldset.getByRole("radio", { name: optionName });
  await option.check();

  const grid = page.getByRole("grid");

  await expect(grid).toHaveCSS("height", `${heightPx}px`);
}

test("grid has height of intrinsic content when height prop set to auto", async ({
  page,
}) => {
  await setHeightAndAssert(page, "auto", 451);
});

test("grid has height of parent when height prop set to parent", async ({
  page,
}) => {
  await setHeightAndAssert(page, "parent", 500);
});

test("grid has specified height when height prop set to number", async ({
  page,
}) => {
  await setHeightAndAssert(page, "number", 300);
});
