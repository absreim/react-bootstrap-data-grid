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

export const clickSelectAllAndVerify: (
  container: Locator,
  name: string,
  endState: "true" | "false",
  startChecked: boolean,
  startIndet: boolean,
  endName: string,
  endChecked: boolean,
) => Promise<void> = async (
  container,
  name,
  endState,
  startChecked,
  startIndet,
  endName,
  endChecked,
) => {
  const selectHeaderCell = container.locator(
    'thead > tr > th[aria-colindex="1"]',
  );
  const selectAllCheckbox = selectHeaderCell.getByRole("checkbox", {
    name,
  });
  await expect(selectAllCheckbox).toHaveJSProperty("checked", startChecked);
  await expect(selectAllCheckbox).toHaveJSProperty("indeterminate", startIndet);
  await selectAllCheckbox.click();

  for (let i = 0; i < 4; i++) {
    const row = container.locator(`tbody > tr[aria-rowindex="${i + 2}"]`);
    await expect(row).toHaveAttribute("aria-selected", endState);
  }

  const endSelectAllCheckbox = selectHeaderCell.getByRole("checkbox", {
    name: endName,
  });
  await expect(endSelectAllCheckbox).toHaveJSProperty("checked", endChecked);
  await expect(endSelectAllCheckbox).toHaveJSProperty("indeterminate", false);
};
