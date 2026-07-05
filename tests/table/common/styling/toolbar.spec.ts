import { test, expect } from "@playwright/test";

["community", "pro"].forEach((edition) => {
  const url = edition === "pro" ? "styling/toolbar/pro" : "styling/toolbar";

  test.describe(`${edition} toolbar styling tests`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    test(`${edition} toolbar custom classes work as expected`, async ({
      page,
    }) => {
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
  });
});
