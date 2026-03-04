import { RowId } from "../types";

export interface SharedTableStyleModel {
  table?: string[];
  tbody?: string[];
  thead?: string[];
  theadTr?: string[];
  theadTh?: (colIndex: number) => string[];
  caption?: string[];
}

export type TableStyleModel = SharedTableStyleModel & {
  tbodyTr?: (rowId: RowId, displayIndex: number) => string[];
  tbodyTd?: (
    rowId: RowId,
    displayRowIndex: number,
    colIndex: number,
  ) => string[];
  tbodyTdInput?: (
    rowId: RowId,
    displayRowIndex: number,
    colIndex: number,
  ) => string[];
  editColTh?: string[];
  editColTd?: (rowId: RowId, displayIndex: number) => string[];
  editStartButton?: (rowId: RowId, displayIndex: number) => string[];
  editDeleteButton?: (rowId: RowId, displayIndex: number) => string[];
  editSaveButton?: (rowId: RowId, displayIndex: number) => string[];
  editCancelButton?: (rowId: RowId, displayIndex: number) => string[];
  rowSelectColTh?: string[];
  rowSelectColTd?: (rowId: RowId, displayIndex: number) => string[];
  rowSelectInput?: (rowId: RowId, displayIndex: number) => string[];
};

export type FilterInputTableStyleModel = SharedTableStyleModel & {
  tbodyTr?: (rowIndex: number) => string[];
  tbodyTd?: (rowIndex: number, colIndex: number) => string[];
  enablementInput?: (rowIndex: number) => string[];
  schemeSelectionInput?: (rowIndex: number) => string[];
  searchStringInput?: (rowIndex: number) => string[];
  numberInput?: (rowIndex: number) => string[];
  startDateInput?: (rowIndex: number) => string[];
  endDateInput?: (rowIndex: number) => string[];
  submitButton?: string[];
};

export interface AdditionalComponentsStyleModel {
  topLevelDiv?: string[];
  filterInputsDiv?: string[];
  tableAndPaginationDiv?: string[];
  filterUiToggleButton?: string[];
}

export interface StyleModel {
  mainTableStyleModel?: TableStyleModel;
  filterInputTableStyleModel?: FilterInputTableStyleModel;
  additionalComponentsStyleModel?: AdditionalComponentsStyleModel;
}
