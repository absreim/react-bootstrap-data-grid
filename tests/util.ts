import { expect, Locator, test } from "@playwright/test";

// Assumes that there are no duplicate values within a row
export const validateGridContents: (
  tbody: Locator,
  contents: string[][],
  rowIndexOffset?: number,
  colIndexOffset?: number,
) => Promise<void> = async (
  tbody,
  contents,
  rowIndexOffset = 0,
  colIndexOffset = 0,
) => {
  for (let i = 0; i < contents.length; i++) {
    const tr = tbody.locator(`tr[aria-rowindex="${rowIndexOffset + i + 2}"]`);
    const row = contents[i];
    for (let j = 0; j < row.length; j++) {
      const value = row[j];
      const td = tr.getByRole("cell", { name: value, exact: true });
      await expect(td).toHaveAttribute(
        "aria-colindex",
        String(j + 1 + colIndexOffset),
      );
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

export const getTestIdVariants: (testIdPrefix: string) => string[] = (
  testIdPrefix,
) => [`${testIdPrefix}-controlled`, `${testIdPrefix}-uncontrolled`];

