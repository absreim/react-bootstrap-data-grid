"use client";

import {
  StyleModel,
} from "@/grid";
import { FC } from "react";
import MainStylingTestHarness from "@/app/styling/main/MainStylingTestHarness";

const completeStyleModel: StyleModel = {
  additionalComponentsStyleModel: {
    topLevelDiv: ["top-level-div-test-class"],
    tableAndPaginationDiv: ["table-and-pagination-div-test-class"],
    tableDiv: ["table-div-test-class"],
    paginationUiDiv: ["pagination-ui-div-test-class"],
  },
  mainTableStyleModel: {
    table: ["main-table-test-class"],
    tbody: ["main-table-body-test-class"],
    thead: ["main-table-thead-test-class"],
    theadTr: ["main-table-thead-tr-test-class"],
    theadTh: (colIndex) => [`main-table-thead-th-test-class-col-${colIndex}`],
    caption: ["main-table-caption-test-class"],
    tbodyTr: (rowId, displayIndex) => [
      `main-table-tbody-tr-test-class-row-id-${rowId}`,
      `main-table-tbody-tr-test-class-display-index-${displayIndex}`,
    ],
    tbodyTd: (rowId, displayIndex, colIndex) => [
      `main-table-tbody-td-test-class-row-id-${rowId}-col-index-${colIndex}`,
      `main-table-tbody-td-test-class-display-index-${displayIndex}-col-index-${colIndex}`,
    ],
    tbodyTdInput: (rowId, displayIndex, colIndex) => [
      `main-table-tbody-td-input-test-class-row-id-${rowId}-col-index-${colIndex}`,
      `main-table-tbody-td-input-test-class-display-index-${displayIndex}-col-index-${colIndex}`,
    ],
    editColTh: ["main-table-edit-col-th-test-class"],
    editColTd: (rowId, displayIndex) => [
      `main-table-edit-col-td-test-class-row-id-${rowId}`,
      `main-table-edit-col-td-test-class-display-index-${displayIndex}`,
    ],
    editStartButton: (rowId, displayIndex) => [
      `main-table-edit-start-button-test-class-row-id-${rowId}`,
      `main-table-edit-start-button-test-class-display-index-${displayIndex}`,
    ],
    editDeleteButton: (rowId, displayIndex) => [
      `main-table-edit-delete-button-test-class-row-id-${rowId}`,
      `main-table-edit-delete-button-test-class-display-index-${displayIndex}`,
    ],
    editSaveButton: (rowId, displayIndex) => [
      `main-table-edit-save-button-test-class-row-id-${rowId}`,
      `main-table-edit-save-button-test-class-display-index-${displayIndex}`,
    ],
    editCancelButton: (rowId, displayIndex) => [
      `main-table-edit-cancel-button-test-class-row-id-${rowId}`,
      `main-table-edit-cancel-button-test-class-display-index-${displayIndex}`,
    ],
    rowSelectColTh: ["main-table-row-select-col-th-test-class"],
    rowSelectColTd: (rowId, displayIndex) => [
      `main-table-row-select-call-td-test-class-row-id-${rowId}`,
      `main-table-row-select-call-td-test-class-display-index-${displayIndex}`,
    ],
    rowSelectInput: (rowId, displayIndex) => [
      `main-table-row-select-input-test-class-row-id-${rowId}`,
      `main-table-row-select-input-test-class-display-index-${displayIndex}`,
    ],
  },
};

const nullStyleModel: StyleModel = {
  mainTableStyleModel: {
    theadTh: () => null,
    tbodyTr: () => null,
    tbodyTd: () => null,
    tbodyTdInput: () => null,
    editColTd: () => null,
    editStartButton: () => null,
    editDeleteButton: () => null,
    editSaveButton: () => null,
    editCancelButton: () => null,
    rowSelectColTd: () => null,
    rowSelectInput: () => null,
  },
};

const TestContents: FC<{ pro?: boolean }> = ({ pro }) => (
  <>
    <div data-testid="complete style model container">
      <MainStylingTestHarness pro={pro} styleModel={completeStyleModel} />
    </div>
    <div data-testid="null style model container">
      <MainStylingTestHarness pro={pro} styleModel={nullStyleModel} />
    </div>
  </>
);

export default TestContents;
