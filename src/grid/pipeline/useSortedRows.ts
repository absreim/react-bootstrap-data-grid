import { useMemo, useState } from "react";
import { ColDataTypeStrings, ColDef, RowDef } from "../types";
import { SortColDef, TableSortModel } from "../sorting/types";

export interface SortedRowsOutput {
  sortedRows: RowDef[];
  sortingEnabled: boolean;
  sortColDef: SortColDef | null | undefined;
  setSortColDef: ((sortColDef: SortColDef | null) => void) | undefined;
}

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
) => (rowA: RowDef, rowB: RowDef) => number = (comparator, fieldName) => {
  return (rowA, rowB) => comparator(rowA.data[fieldName], rowB.data[fieldName]);
};

const useSortedRows: (
  rows: RowDef[],
  cols: ColDef[],
  sortModel: TableSortModel | undefined,
) => SortedRowsOutput = (rows, cols, sortModel) => {
  const [internalSortColDef, setInternalSortColDef] =
    useState<SortColDef | null>(
      (sortModel?.type === "uncontrolled" && sortModel.initialSortColDef) ||
        null,
    );
  const sortColDef =
    sortModel?.type === "uncontrolled"
      ? internalSortColDef
      : sortModel?.sortColDef || undefined;
  const setSortColDef =
    sortModel?.type === "uncontrolled"
      ? setInternalSortColDef
      : sortModel?.setSortColDef || undefined;
  const sortingEnabled = !!sortModel;

  const sortedRows = useMemo(() => {
    if (!sortColDef) {
      return rows;
    }

    const sortFieldName = sortColDef.name;
    const sortOrder = sortColDef.order;

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
  }, [sortColDef, cols, rows]);

  return { sortedRows, sortingEnabled, sortColDef, setSortColDef };
};

export default useSortedRows;
