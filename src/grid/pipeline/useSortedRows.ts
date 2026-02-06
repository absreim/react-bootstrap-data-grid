import { useMemo } from "react";
import {
  AugRowDef,
  ColDataTypeStrings,
  ColDef,

} from "../types";
import { TableSortModel } from "../sorting/types";

const getTypeComparator: (
  typeStr: ColDataTypeStrings,
) => (a: any, b: any) => number = (typeStr) => {
  if (typeStr === "date" || typeStr === "datetime") {
    return (a: Date, b: Date) => a.valueOf() - b.valueOf();
  }
  if (typeStr === "number") {
    return (a: number, b: number) => a - b;
  }
  return (a: string, b: string) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  };
};

const getRowComparator: (
  comparator: (a: any, b: any) => number,
  fieldName: string,
) => (rowA: AugRowDef, rowB: AugRowDef) => number = (comparator, fieldName) => {
  return (rowA, rowB) => comparator(rowA.data[fieldName], rowB.data[fieldName]);
};

const useSortedRows: (
  rows: AugRowDef[],
  cols: ColDef[],
  sortModel: TableSortModel | undefined,
) => AugRowDef[] = (rows, cols, sortModel) =>
  useMemo(() => {
    if (!sortModel || !sortModel.sortColDef) {
      return rows;
    }

    const sortFieldName = sortModel.sortColDef.name;
    const sortOrder = sortModel.sortColDef.order;

    const sortColIndex = cols.findIndex(({ name }) => name === sortFieldName);
    if (sortColIndex < 0) {
      throw new Error(
        `The sortModel for the grid specifies that the data should be sorted based on a column named ${sortFieldName}, but it was not found among the column definitions.`,
      );
    }

    const typeStr = cols[sortColIndex].type;
    const ascComparator = getTypeComparator(typeStr);

    let rowComparator = getRowComparator(ascComparator, sortFieldName);
    if (sortOrder === "desc") {
      const descComparator: (a: any, b: any) => number = (a, b) =>
        ascComparator(a, b) * -1;
      rowComparator = getRowComparator(descComparator, sortFieldName);
    }
    return rows.slice().sort(rowComparator);
  }, [rows, cols, sortModel]);

export default useSortedRows;
