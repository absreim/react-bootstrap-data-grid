import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("styling/toolbar");
});

test("toolbar custom classes work as expected", async ({ page }) => {
  const toolbarContainer = page.getByTestId("toolbar container");

  const toolbar = toolbarContainer.getByRole("toolbar");
  await expect(toolbar).toHaveClass("toolbar-test-class");

  const toggleButton = toolbar.getByRole("button", {
    name: "Filtering",
  });
  await expect(toggleButton).toHaveClass("inactive-button-test-class");
  await toggleButton.click();

  await expect(toggleButton).toHaveClass("active-button-test-class");

  const interfaceContainer = toolbarContainer.getByTestId(
    "toolbar feature interface content container",
  );
  await expect(interfaceContainer).toHaveClass(
    "interface-container-test-class",
  );
});
