import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("grid/toolbar");
})

test("main component spacing works as expected", async ({ page }) => {
  const topLevelContainer = page.getByTestId("rbdg-top-level-grid-container");
  await expect(topLevelContainer).toContainClass("gap-2");

  const spacingGroup = page.getByRole("group", { name: "Main Component Spacing" });
  const fiveOption = spacingGroup.getByRole("radio", { name: "5" });
  await fiveOption.check();
  await expect(topLevelContainer).toContainClass("gap-5");

  const zeroOption = spacingGroup.getByRole("radio", { name: "0" });
  await zeroOption.check();
  await expect(topLevelContainer).toContainClass("gap-0");
});
