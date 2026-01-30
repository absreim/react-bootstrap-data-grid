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
  editInput: (colIndex: number) => string[];
  editSelect: (colIndex: number) => string[];
  editPrimaryButton: string[];
  editSecondaryButton: string[];
}

export type UnwrappedTableStyleModel = UnwrappedSharedTableStyleModel & {
  tbodyTr: (origIndex: number, displayIndex: number) => string[];
  tbodyTd: (
    origRowIndex: number,
    displayRowIndex: number,
    colIndex: number,
  ) => string[];
};

export type UnwrappedFilterInputTableStyleModel = UnwrappedSharedTableStyleModel & {
  tbodyTr: (index: number) => string[];
  tbodyTd: (index: number, colIndex: number) => string[];
  enablementInput: string[];
  schemeSelectionInput: string[];
  searchStringInput: string[];
  numberInput: string[];
  startDateInput: string[];
  endDateInput: string[];
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
  editInput: sharedStyleModel?.editInput
    ? sharedStyleModel.editInput
    : () => [],
  editSelect: sharedStyleModel?.editSelect
    ? sharedStyleModel.editSelect
    : () => [],
  editPrimaryButton: sharedStyleModel?.editPrimaryButton || [],
  editSecondaryButton: sharedStyleModel?.editSecondaryButton || [],
});

export const unwrapTableStyleModel: (
  tableStyleModel: TableStyleModel | undefined,
) => UnwrappedTableStyleModel = (tableStyleModel) => ({
  ...unwrapSharedStyleModel(tableStyleModel),
  tbodyTr: tableStyleModel?.tbodyTr ? tableStyleModel.tbodyTr : () => [],
  tbodyTd: tableStyleModel?.tbodyTd ? tableStyleModel.tbodyTd : () => [],
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
});
