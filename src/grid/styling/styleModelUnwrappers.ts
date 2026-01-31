import {
  FilterInputTableStyleModel,
  SharedTableStyleModel,
  TableStyleModel,
} from "../types";

export interface UnwrappedSharedTableStyleModel {
  table: string[];
  tbody: string[];
  thead: string[];
  theadTr: string[];
  theadTh: (colIndex: number) => string[];
  caption: string[];
}

export type UnwrappedTableStyleModel = UnwrappedSharedTableStyleModel & {
  tbodyTr: (origIndex: number, displayIndex: number) => string[];
  tbodyTd: (
    origRowIndex: number,
    displayRowIndex: number,
    colIndex: number,
  ) => string[];
  tbodyTdInput: (
    origRowIndex: number,
    displayRowIndex: number,
    colIndex: number,
  ) => string[];
  editColTh: string[];
  editColTd: (origIndex: number, displayIndex: number) => string[];
  selectColTh: string[];
  selectColTd: (origIndex: number, displayIndex: number) => string[];
  selectInput: (origIndex: number, displayIndex: number) => string[];
  editPrimaryButton: string[];
  editSecondaryButton: string[];
};

export type UnwrappedFilterInputTableStyleModel =
  UnwrappedSharedTableStyleModel & {
    tbodyTr: (index: number) => string[];
    tbodyTd: (index: number, colIndex: number) => string[];
    enablementInput: string[];
    schemeSelectionInput: string[];
    searchStringInput: string[];
    numberInput: string[];
    startDateInput: string[];
    endDateInput: string[];
    submitButton: string[];
  };

const unwrapSharedStyleModel: (
  sharedStyleModel: SharedTableStyleModel | undefined,
) => UnwrappedSharedTableStyleModel = (sharedStyleModel) => ({
  table: sharedStyleModel?.table || [],
  tbody: sharedStyleModel?.tbody || [],
  thead: sharedStyleModel?.thead || [],
  theadTr: sharedStyleModel?.theadTr || [],
  theadTh: sharedStyleModel?.theadTh ? sharedStyleModel.theadTh : () => [],
  caption: sharedStyleModel?.caption || [],
});

export const unwrapTableStyleModel: (
  tableStyleModel: TableStyleModel | undefined,
) => UnwrappedTableStyleModel = (tableStyleModel) => ({
  ...unwrapSharedStyleModel(tableStyleModel),
  tbodyTr: tableStyleModel?.tbodyTr ? tableStyleModel.tbodyTr : () => [],
  tbodyTd: tableStyleModel?.tbodyTd ? tableStyleModel.tbodyTd : () => [],
  tbodyTdInput: tableStyleModel?.tbodyTdInput
    ? tableStyleModel.tbodyTdInput
    : () => [],
  editPrimaryButton: tableStyleModel?.editPrimaryButton || [],
  editSecondaryButton: tableStyleModel?.editSecondaryButton || [],
  editColTh: tableStyleModel?.editColTh || [],
  editColTd: tableStyleModel?.editColTd ? tableStyleModel.editColTd : () => [],
  selectColTh: tableStyleModel?.selectColTh || [],
  selectColTd: tableStyleModel?.selectColTd
    ? tableStyleModel.selectColTd
    : () => [],
  selectInput: tableStyleModel?.selectInput
    ? tableStyleModel.selectInput
    : () => [],
});

export const unwrapFilterInputTableStyleModel: (
  filterTableStyleModel: FilterInputTableStyleModel | undefined,
) => UnwrappedFilterInputTableStyleModel = (filterTableStyleModel) => ({
  ...unwrapSharedStyleModel(filterTableStyleModel),
  tbodyTr: filterTableStyleModel?.tbodyTr
    ? filterTableStyleModel.tbodyTr
    : () => [],
  tbodyTd: filterTableStyleModel?.tbodyTd
    ? filterTableStyleModel.tbodyTd
    : () => [],
  enablementInput: filterTableStyleModel?.enablementInput || [],
  schemeSelectionInput: filterTableStyleModel?.schemeSelectionInput || [],
  searchStringInput: filterTableStyleModel?.searchStringInput || [],
  numberInput: filterTableStyleModel?.numberInput || [],
  startDateInput: filterTableStyleModel?.startDateInput || [],
  endDateInput: filterTableStyleModel?.endDateInput || [],
  submitButton: filterTableStyleModel?.submitButton || [],
});
