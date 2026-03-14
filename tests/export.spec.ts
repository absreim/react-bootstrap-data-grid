import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  page.goto("export");
})

test("unavailable options are disabled",async ({ page }) => {
  const container = page.getByTestId("options disabled test container");
  const toolbar = container.getByRole("toolbar");
  await toolbar.getByRole("button", { name: "Export" }).click();

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