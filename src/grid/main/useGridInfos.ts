import {
  GridBodyRowInfo,
  GridHeaderColInfo,
  UseGridInfos,
} from "@/grid/main/types";
import { FormattedRow, ColDef } from "@/common";
import { useMemo } from "react";
import { DEFAULT_COL_WIDTH } from "@/common/constants";

const useGridInfos: (
  cols: ColDef[],
  rows: FormattedRow[],
) => UseGridInfos = (cols, rows) => {
  const colInfos: GridHeaderColInfo[] = useMemo(
    () =>
      cols.map(({ width, label, name }) => ({
        width: width || DEFAULT_COL_WIDTH,
        label,
        name,
      })),
    [cols],
  );

  const rowInfos: GridBodyRowInfo[] = useMemo(
    () =>
      rows.map(({ id, prePaginationIndex, contents }) => ({
        id,
        prePaginationIndex,
        cellInfos: contents.map(({ formattedValue }, index) => ({
          formattedValue,
          width: colInfos[index].width,
          columnName: colInfos[index].name,
        })),
      })),
    [colInfos, rows],
  );

  return {
    colInfos,
    rowInfos,
  };
};

export default useGridInfos;
