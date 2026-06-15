import { RowId } from "../../common/types";

export interface SharedTableStyleModel {
  table?: string[];
  tbody?: string[];
  thead?: string[];
  theadTr?: string[];
  theadTh?: (colIndex: number) => string[] | null;
  caption?: string[];
}

export type TableStyleModel = SharedTableStyleModel & {
  tbodyTr?: (rowId: RowId, displayIndex: number) => string[] | null;
  tbodyTd?: (
    rowId: RowId,
    displayRowIndex: number,
    colIndex: number,
  ) => string[] | null;
  tbodyTdInput?: (
    rowId: RowId,
    displayRowIndex: number,
    colIndex: number,
  ) => string[] | null;
  editColTh?: string[];
  editColTd?: (rowId: RowId, displayIndex: number) => string[] | null;
  editStartButton?: (rowId: RowId, displayIndex: number) => string[] | null;
  editDeleteButton?: (rowId: RowId, displayIndex: number) => string[] | null;
  editSaveButton?: (rowId: RowId, displayIndex: number) => string[] | null;
  editCancelButton?: (rowId: RowId, displayIndex: number) => string[] | null;
  rowSelectColTh?: string[];
  rowSelectColTd?: (rowId: RowId, displayIndex: number) => string[] | null;
  rowSelectInput?: (rowId: RowId, displayIndex: number) => string[] | null;
};

export type FilterInputTableStyleModel = SharedTableStyleModel & {
  tbodyTr?: (rowIndex: number) => string[] | null;
  tbodyTd?: (rowIndex: number, colIndex: number) => string[] | null;
  enablementInput?: (rowIndex: number) => string[] | null;
  schemeSelectionInput?: (rowIndex: number) => string[] | null;
  searchStringInput?: (rowIndex: number) => string[] | null;
  numberInput?: (rowIndex: number) => string[] | null;
  startDateInput?: (rowIndex: number) => string[] | null;
  endDateInput?: (rowIndex: number) => string[] | null;
  submitButton?: string[];
  form?: string[];
};

export interface AdditionalComponentsStyleModel {
  topLevelDiv?: string[];
  tableAndPaginationDiv?: string[];
  tableDiv?: string[];
  paginationUiDiv?: string[];
}
