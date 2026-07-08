import { expect, test } from "@playwright/test";
import { GRID_BODY_DATA_TEST_ID, GRID_HEADER_DATA_TEST_ID } from "@/grid/constants";

interface VariantSpec {
  bgColor: string;
  borderColor: string;
  stripeShadow: string;
  hoverShadow: string;
}

const variantSpecs: Record<string, VariantSpec> = {
  success: {
    bgColor: "rgb(209, 231, 221)",
    borderColor: "rgb(167, 185, 177)",
    stripeShadow: "rgb(199, 219, 210) 0px 0px 0px 9999px inset",
    hoverShadow: "rgb(193, 214, 204) 0px 0px 0px 9999px inset",
  },
  bsbrand: {
    bgColor: "rgb(227, 213, 254)",
    borderColor: "rgb(181, 170, 203)",
    stripeShadow: "rgb(215, 202, 241) 0px 0px 0px 9999px inset",
    hoverShadow: "rgb(210, 197, 235) 0px 0px 0px 9999px inset",
  },
};

const expectedDefaultBoxShadow = "rgba(0, 0, 0, 0) 0px 0px 0px 9999px inset";
const expectedDividerColor = "rgb(0, 0, 0)";

test.beforeEach(async ({ page }) => {
  await page.goto("grid");
});

Object.keys(variantSpecs).forEach((variant) => {
  test.describe(`table color variant ${variant}`, () => {
    test.beforeEach(async ({ page }) => {
      const variantDropdown = page.getByRole("combobox", {
        name: "Select variant",
      });
      await variantDropdown.selectOption(variant);
    });

    const { bgColor, borderColor, stripeShadow, hoverShadow } = variantSpecs[variant];

    test("border and bg colors work correctly under default settings", async ({
      page,
    }) => {
      const gridcells = await page.getByRole("gridcell").all();
      const headerCells = await page.getByRole("columnheader").all();

      expect(gridcells).toHaveLength(40);
      expect(headerCells).toHaveLength(4);

      const allCells = gridcells.concat(headerCells);

      for (const cell of allCells) {
        await expect(cell).toHaveCSS("background-color", bgColor);
        await expect(cell).toHaveCSS("border-bottom-color", borderColor);
      }
    });

    test("row stripe box shadows work correctly", async ({ page }) => {
      const stripeFieldset = page.getByRole("group", {
        name: "Stripe Setting",
      });
      const rowsRadio = stripeFieldset.getByRole("radio", { name: "rows" });
      await rowsRadio.click();

      const gridBody = page.getByTestId(GRID_BODY_DATA_TEST_ID);
      const oddBodyRowCells = await gridBody
        .locator("div:nth-child(odd) > div")
        .all();
      const evenBodyRowCells = await gridBody
        .locator("div:nth-child(even) > div")
        .all();

      expect(oddBodyRowCells).toHaveLength(20);
      expect(evenBodyRowCells).toHaveLength(20);

      for (const cell of oddBodyRowCells) {
        await expect(cell).toHaveCSS("box-shadow", stripeShadow);
      }

      for (const cell of evenBodyRowCells) {
        await expect(cell).toHaveCSS("box-shadow", expectedDefaultBoxShadow);
      }
    });

    test("column stripe box shadows work correctly", async ({ page }) => {
      const stripeFieldset = page.getByRole("group", {
        name: "Stripe Setting",
      });
      const columnsRadio = stripeFieldset.getByRole("radio", {
        name: "columns",
      });
      await columnsRadio.click();

      const evenColCells = await page
        .getByRole("grid")
        .locator("div > div > div:nth-child(even)")
        .all();
      const oddColCells = await page
        .getByRole("grid")
        .locator("div > div > div:nth-child(odd)")
        .all();

      expect(oddColCells).toHaveLength(22);
      expect(evenColCells).toHaveLength(22);

      for (const cell of oddColCells) {
        await expect(cell).toHaveCSS("box-shadow", expectedDefaultBoxShadow);
      }

      for (const cell of evenColCells) {
        await expect(cell).toHaveCSS("box-shadow", stripeShadow);
      }
    });

    test("hover styles work correctly", async ({ page }) => {
      const stripeFieldset = page.getByRole("group", {
        name: "Stripe Setting",
      });
      const rowsRadio = stripeFieldset.getByRole("radio", { name: "rows" });
      await rowsRadio.click();

      const hoverToggle = page.getByRole("checkbox", { name: "Hover Styles" });
      await hoverToggle.check();

      const gridBody = page.getByTestId(GRID_BODY_DATA_TEST_ID);
      const bodyRows = await gridBody.getByRole("row").all();
      await expect(bodyRows).toHaveLength(10);

      for (const row of bodyRows) {
        await row.hover();
        const rowCells = await row.getByRole("gridcell").all();
        await expect(rowCells).toHaveLength(4);
        for (const cell of rowCells) {
          await expect(cell).toHaveCSS(
            "box-shadow",
            hoverShadow,
          );
        }
      }
    });

    test("divider color overrides variant border color for horizontal borders", async ({
      page,
    }) => {
      const dividerToggle = page.getByRole("checkbox", {
        name: "Body Divider",
      });
      await dividerToggle.check();

      const gridHeader = page.getByTestId(GRID_HEADER_DATA_TEST_ID);
      const headerCells = await gridHeader.getByRole("columnheader").all();

      expect(headerCells).toHaveLength(4);

      for (const cell of headerCells) {
        await expect(cell).toHaveCSS(
          "border-bottom-color",
          expectedDividerColor,
        );
      }
    });

    test("divider color overrides variant border color for full borders", async ({
      page,
    }) => {
      const dividerToggle = page.getByRole("checkbox", {
        name: "Body Divider",
      });
      await dividerToggle.check();

      const borderOptions = page.getByRole("group", { name: "Border Setting" });
      const fullRadio = borderOptions.getByRole("radio", { name: "full" });
      await fullRadio.check();

      const gridHeader = page.getByTestId(GRID_HEADER_DATA_TEST_ID);
      const headerRow = gridHeader.getByRole("row");
      await expect(headerRow).toHaveCSS(
        "border-bottom-color",
        expectedDividerColor,
      );
    });
  });
});
