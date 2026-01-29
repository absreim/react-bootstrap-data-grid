import { TableStyleModel } from "../types";

export interface UnwrappedTableStyleModel {
  table: string[];
  tbody: string[];
  thead: string[];
  theadTr: string[];
  theadTh: (colIndex: number) => string[];
  tbodyTr: (origIndex: number, displayIndex: number) => string[];
  tbodyTd: (
    origRowIndex: number,
    displayRowIndex: number,
    colIndex: number,
  ) => string[];
  caption: string[];
  editInput: (colIndex: number) => string[];
  editSelect: (colIndex: number) => string[];
  editPrimaryButton: string[];
  editSecondaryButton: string[];
}

const unwrapTableStyleModel: (
  tableStyleModel: TableStyleModel | undefined,
) => UnwrappedTableStyleModel = (tableStyleModel) => ({
  table: tableStyleModel?.table || [],
  tbody: tableStyleModel?.tbody || [],
  thead: tableStyleModel?.thead || [],
  theadTr: tableStyleModel?.theadTr || [],
  theadTh: tableStyleModel?.theadTh ? tableStyleModel.theadTh : () => [],
  tbodyTr: tableStyleModel?.tbodyTr ? tableStyleModel.tbodyTr : () => [],
  tbodyTd: tableStyleModel?.tbodyTd ? tableStyleModel.tbodyTd : () => [],
  caption: tableStyleModel?.caption || [],
  editInput: tableStyleModel?.editInput ? tableStyleModel.editInput : () => [],
  editSelect: tableStyleModel?.editSelect ? tableStyleModel.editSelect : () => [],
  editPrimaryButton: tableStyleModel?.editPrimaryButton || [],
  editSecondaryButton: tableStyleModel?.editSecondaryButton || [],
});

export default unwrapTableStyleModel;
