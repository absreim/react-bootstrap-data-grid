import { test } from "@playwright/test";
import { getTestIdVariants, validateGridContents } from "../util";

["community", "pro"].forEach((edition) => {
  const url = edition === "pro" ? "filtering/other/pro" : "filtering/other";

  test.describe(`${edition} filtering other tests`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    ["controlled", "uncontrolled"].forEach((controlScheme) => {
      test(`${controlScheme} less than number filter works correctly`, async ({
        page,
      }) => {
        const testId = `number less than grid container-${controlScheme}`;
        const container = page.getByTestId(testId);

        const gridTable = container.locator('table[aria-rowcount="4"]');
        const tbody = gridTable.locator("tbody");
        const expectedInitialContents: string[][] = [
          ["-1"],
          ["0"],
          ["0.99999"],
        ];
        await validateGridContents(tbody, expectedInitialContents);

        const toolbar = container.getByRole("toolbar");
        const filterToggle = toolbar.getByRole("button", {
          name: "Filtering",
        });
        await filterToggle.click();

        await container
          .getByRole("spinbutton", {
            name: "Number Column Column Filter Value",
          })
          .fill("0");
        await container.getByRole("button", { name: "Submit" }).click();

        const newGridTable = container.locator('table[aria-rowcount="2"]');
        const expectedSubsequentContents: string[][] = [["-1"]];
        const newTbody = newGridTable.locator("tbody");
        await validateGridContents(newTbody, expectedSubsequentContents);
      });

      test(`${controlScheme} greater than number filter works correctly`, async ({ page }) => {
        const testId = `number greater than grid container-${controlScheme}`;
        const container = page.getByTestId(testId);

        const gridTable = container.locator('table[aria-rowcount="2"]');
        const tbody = gridTable.locator("tbody");
        const expectedInitialContents: string[][] = [["1.00001"]];
        await validateGridContents(tbody, expectedInitialContents);

        const toolbar = container.getByRole("toolbar");
        const filterToggle = toolbar.getByRole("button", {
          name: "Filtering",
        });
        await filterToggle.click();

        await container
          .getByRole("spinbutton", {
            name: "Number Column Column Filter Value",
          })
          .fill("0");
        await container.getByRole("button", { name: "Submit" }).click();

        const newGridTable = container.locator('table[aria-rowcount="4"]');
        const expectedSubsequentContents: string[][] = [
          ["0.99999"],
          ["1"],
          ["1.00001"],
        ];
        const newTbody = newGridTable.locator("tbody");
        await validateGridContents(newTbody, expectedSubsequentContents);
      });

      test(`${controlScheme} equals number filter works correctly`, async ({ page }) => {
        const testId = `number equals grid container-${controlScheme}`;
        const container = page.getByTestId(testId);

        const gridTable = container.locator('table[aria-rowcount="2"]');
        const tbody = gridTable.locator("tbody");
        const expectedInitialContents: string[][] = [["1"]];
        await validateGridContents(tbody, expectedInitialContents);

        const toolbar = container.getByRole("toolbar");
        const filterToggle = toolbar.getByRole("button", {
          name: "Filtering",
        });
        await filterToggle.click();

        await container
          .getByRole("spinbutton", {
            name: "Number Column Column Filter Value",
          })
          .fill("-1");
        await container.getByRole("button", { name: "Submit" }).click();

        const expectedSubsequentContents: string[][] = [["-1"]];
        const newTbody = gridTable.locator("tbody");
        await validateGridContents(newTbody, expectedSubsequentContents);
      });

      test(`${controlScheme} less than or equals number filter works correctly`, async ({
        page,
      }) => {
        const testId = `number leq grid container-${controlScheme}`;
        const container = page.getByTestId(testId);

        const gridTable = container.locator('table[aria-rowcount="5"]');
        const tbody = gridTable.locator("tbody");
        const expectedInitialContents: string[][] = [
          ["-1"],
          ["0"],
          ["0.99999"],
          ["1"],
        ];
        await validateGridContents(tbody, expectedInitialContents);

        const toolbar = container.getByRole("toolbar");
        const filterToggle = toolbar.getByRole("button", {
          name: "Filtering",
        });
        await filterToggle.click();

        await container
          .getByRole("spinbutton", {
            name: "Number Column Column Filter Value",
          })
          .fill("0");
        await container.getByRole("button", { name: "Submit" }).click();

        const newGridTable = container.locator('table[aria-rowcount="3"]');
        const expectedSubsequentContents: string[][] = [["-1"], ["0"]];
        const newTbody = newGridTable.locator("tbody");
        await validateGridContents(newTbody, expectedSubsequentContents);
      });

      test(`${controlScheme} greater than or equals number filter works correctly`, async ({
        page,
      }) => {
        const testId = `number geq grid container-${controlScheme}`;
        const container = page.getByTestId(testId);

        const gridTable = container.locator('table[aria-rowcount="3"]');
        const tbody = gridTable.locator("tbody");
        const expectedInitialContents: string[][] = [["1"], ["1.00001"]];
        await validateGridContents(tbody, expectedInitialContents);

        const toolbar = container.getByRole("toolbar");
        const filterToggle = toolbar.getByRole("button", {
          name: "Filtering",
        });
        await filterToggle.click();

        await container
          .getByRole("spinbutton", {
            name: "Number Column Column Filter Value",
          })
          .fill("0");
        await container.getByRole("button", { name: "Submit" }).click();

        const newGridTable = container.locator('table[aria-rowcount="5"]');
        const expectedSubsequentContents: string[][] = [
          ["0"],
          ["0.99999"],
          ["1"],
          ["1.00001"],
        ];
        const newTbody = newGridTable.locator("tbody");
        await validateGridContents(newTbody, expectedSubsequentContents);
      });

      test(`${controlScheme} contains string filter works correctly`, async ({ page }) => {
        const testId = `string contains grid container-${controlScheme}`;
        const container = page.getByTestId(testId);

        const gridTable = container.locator('table[aria-rowcount="3"]');
        const tbody = gridTable.locator("tbody");
        const expectedInitialContents: string[][] = [
          ["foobar"],
          ["foobarfizzbuzz"],
        ];
        await validateGridContents(tbody, expectedInitialContents);

        const toolbar = container.getByRole("toolbar");
        const filterToggle = toolbar.getByRole("button", {
          name: "Filtering",
        });
        await filterToggle.click();

        await container
          .getByRole("textbox", { name: "String Column Column Filter Value" })
          .fill("fizz");
        await container.getByRole("button", { name: "Submit" }).click();

        const expectedSubsequentContents: string[][] = [
          ["fizzbuzz"],
          ["foobarfizzbuzz"],
        ];
        const newTbody = gridTable.locator("tbody");
        await validateGridContents(newTbody, expectedSubsequentContents);
      });

      test(`${controlScheme} starts with string filter works correctly`, async ({ page }) => {
        const testId = `string starts with grid container-${controlScheme}`;
        const container = page.getByTestId(testId);

        const gridTable = container.locator('table[aria-rowcount="3"]');
        const tbody = gridTable.locator("tbody");
        const expectedInitialContents: string[][] = [
          ["foobar"],
          ["foobarfizzbuzz"],
        ];
        await validateGridContents(tbody, expectedInitialContents);

        const toolbar = container.getByRole("toolbar");
        const filterToggle = toolbar.getByRole("button", {
          name: "Filtering",
        });
        await filterToggle.click();

        await container
          .getByRole("textbox", { name: "String Column Column Filter Value" })
          .fill("fizz");
        await container.getByRole("button", { name: "Submit" }).click();

        const newGridTable = container.locator('table[aria-rowcount="2"]');
        const expectedSubsequentContents: string[][] = [["fizzbuzz"]];
        const newTbody = newGridTable.locator("tbody");
        await validateGridContents(newTbody, expectedSubsequentContents);
      });
    });
  });
});
