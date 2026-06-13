import { AugFormattedRow, FormattedRow } from "../types";
import { useMemo } from "react";
import { ColNameToWidth } from "./types";

const useAugFormattedRows: (
  colNameToWidth: ColNameToWidth,
  rows: FormattedRow[],
) => AugFormattedRow[] = (colNameToWidth, rows) =>
  useMemo(
    () =>
      rows.map((row) => {
        return {
          ...row,
          contents: row.contents.map((cell) => {
            return {
              ...cell,
              width: colNameToWidth[cell.fieldName],
            };
          }),
        };
      }),
    [colNameToWidth, rows],
  );

export default useAugFormattedRows;
