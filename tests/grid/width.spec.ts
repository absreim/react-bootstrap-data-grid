import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

test("grid has width of intrinsic content when width prop unset", async ({
  page,
}) => {
  const grid = page.getByRole("grid");

  await expect(grid).toHaveCSS("width", "652px");
});

async function setWidthAndAssert(page: Page, optionName: string, widthPx: number) {
  const widthFieldset = page.getByRole("group", { name: "Width Setting" });
  const option = widthFieldset.getByRole("radio", { name: optionName });
  await option.check();

  const grid = page.getByRole("grid");

  await expect(grid).toHaveCSS("width", `${widthPx}px`);
}

test("grid has width of intrinsic content when width prop set to auto", async ({
  page,
}) => {
  await setWidthAndAssert(page, "auto", 652);
});

test("grid has width of parent when width prop set to parent", async ({
  page,
}) => {
  await setWidthAndAssert(page, "parent", 700);
});

test("grid has specified width when width prop set to number", async ({
  page,
}) => {
  await setWidthAndAssert(page, "number", 400);
});
