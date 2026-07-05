import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

test("grid has width of intrinsic content when width prop unset", async ({
  page,
}) => {
  const grid = page.getByRole("grid");

  await expect(grid).toHaveCSS("width", "652px");
});

test("grid has width of intrinsic content when width prop set to auto", async ({
  page,
}) => {
  const widthFieldset = await page.getByRole("group", { name: "Width Setting" });
  const autoOption = widthFieldset.getByRole("radio", { name: "auto" });
  await autoOption.check();

  const grid = page.getByRole("grid");

  await expect(grid).toHaveCSS("width", "652px");
});
