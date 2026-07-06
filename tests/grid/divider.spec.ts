import { expect, Page, test } from "@playwright/test";
import { GRID_HEADER_DATA_TEST_ID } from "@/grid/constants";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

async function checkHeaderRowBottomBorderWidth(page: Page, borderWidthPx: number): Promise<void> {
  const gridHeader = page.getByTestId(GRID_HEADER_DATA_TEST_ID);
  const headerCells = await gridHeader.getByRole("gridcell").all();

  for (const cell of headerCells) {
    await expect(cell).toHaveCSS(
      "border-bottom-width",
      `${borderWidthPx}px`,
    );
  }
}

test(`divider does not display when "divider" prop is set to false`, async ({ page }) => {
  await checkHeaderRowBottomBorderWidth(page, 1);
});

test.describe("divider displays correctly when enabled", () => {
  test.beforeEach(async ({ page }) => {
    const dividerToggle = page.getByRole("checkbox", { name: "Body Divider" });
    await dividerToggle.check();
  })

  test(`divider displays correctly with default "border" setting`, async ({
    page,
  }) => {
    await checkHeaderRowBottomBorderWidth(page, 2);
  });

  test(`divider displays correctly with "full" "border" setting`, async ({
    page,
  }) => {
    const borderOptions = page.getByRole("group", { name: "Border Setting" });
    const fullRadio = borderOptions.getByRole("radio", { name: "full" });
    await fullRadio.check();

    await checkHeaderRowBottomBorderWidth(page, 2);
  });

  test(`divider displays correctly with "none" "border" setting`, async ({
    page,
  }) => {
    const borderOptions = page.getByRole("group", { name: "Border Setting" });
    const noneRadio = borderOptions.getByRole("radio", { name: "none" });
    await noneRadio.check();

    await checkHeaderRowBottomBorderWidth(page, 2);
  });
})
