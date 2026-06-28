
import { useMemo } from "react";
import { ColNameToWidth } from "./types";
import { FormattedRow } from "@/common";

const useAugFormattedRows: (
  colNameToWidth: ColNameToWidth,
  rows: FormattedRow[],
) => FormattedRow[] = (colNameToWidth, rows) =>
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
