import { expect, Locator } from "@playwright/test";

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

export const confirmColWidth: (
  targetWidth: number,
  tolerance: number,
  ariaColIndex: number,
  container: Locator,
) => Promise<void> = async (
  targetWidth,
  tolerance,
  ariaColIndex,
  container,
) => {
  const cells = await container
    .locator(`[aria-colindex="${ariaColIndex}"]`)
    .all();
  for (const cell of cells) {
    await expect(async () => {
      const widthStr = await cell.evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue("width"),
      );
      const width = parseFloat(widthStr);
      expect(width).toBeGreaterThanOrEqual(targetWidth - tolerance);
      expect(width).toBeLessThanOrEqual(targetWidth + tolerance);
    }).toPass();
  }
};
