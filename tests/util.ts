import { Locator } from "playwright-core";
import { expect } from "@playwright/test";

// Caveats:
// - Assumes no columns in front of the data columns, like the selection control column
// - Assumes that there are no duplicate values within a row
export const validateGridContents: (
  tbody: Locator,
  contents: string[][],
) => Promise<void> = async (tbody, contents) => {
  for (let i = 0; i < contents.length; i++) {
    const tr = tbody.locator(`tr[aria-rowindex="${i + 2}"]`);
    const row = contents[i];
    for (let j = 0; j < row.length; j++) {
      const value = row[j];
      const td = tr.getByRole("cell", { name: value, exact: true });
      await expect(td).toHaveAttribute("aria-colindex", String(j + 1));
    }
  }
};
