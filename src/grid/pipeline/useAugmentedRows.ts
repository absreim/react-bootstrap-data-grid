import { AugRowDef, RowDef } from "../types";
import { useMemo } from "react";

const useAugmentedRows: (rows: RowDef[]) => AugRowDef[] = (rows) =>
  useMemo(
    () =>
      rows.map((row, index) => ({
        data: row,
        meta: {
          origIndex: index,
        },
      })),
    [rows],
  );

export default useAugmentedRows;
