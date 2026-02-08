"use client";

import Grid, {
  ColDef,
  EditModel,
  GridPaginationState,
  MultiSelectModel,
  RowDef,
  SortColDef,
  StyleModel,
  TableSortModel,
} from "@/grid";
import { FC, useMemo, useState } from "react";

const cols: ColDef[] = [
  {
    name: "strCol",
    type: "string",
    label: "String Column",
  },
  {
    name: "numCol",
    type: "number",
    label: "Number Column",
    sortable: true,
  },
];

const rows: RowDef[] = [
  {
    strCol: "First Row",
    numCol: 1,
  },
  {
    strCol: "Second Row",
    numCol: 2,
  },
  {
    strCol: "Third Row",
    numCol: 3,
  },
  {
    strCol: "Fourth Row",
    numCol: 4,
  },
  {
    strCol: "Fifth Row",
    numCol: 5,
  },
];

const pageSizeOptions = [3];
const maxPageButtons = 100;

// For this particular case of testing, these functions don't need to do
// anything. It is only necessary for the browser to display the buttons.
const editModel: EditModel = {
  getUpdateCallback: () => () => {},
  getDeleteCallback: () => () => {},
};

const styleModel: StyleModel = {
  additionalComponentsStyleModel: {
    topLevelDiv: ["top-level-div-test-class"],
    tableAndPaginationDiv: ["table-and-pagination-div-test-class"],
  },
  mainTableStyleModel: {
    table: ["main-table-test-class"],
    tbody: ["main-table-body-test-class"],
    thead: ["main-table-thead-test-class"],
    theadTr: ["main-table-thead-tr-test-class"],
    theadTh: (colIndex) => [`main-table-thead-th-test-class-col-${colIndex}}`],
    caption: ["main-table-caption-test-class"],
    tbodyTr: (origIndex, displayIndex) => [
      `main-table-tbody-tr-test-class-orig-index-${origIndex}`,
      `main-table-tbody-tr-test-class-display-index-${displayIndex}`,
    ],
    tbodyTd: (origIndex, displayIndex, colIndex) => [
      `main-table-tbody-td-test-class-orig-index-${origIndex}-col-index-${colIndex}`,
      `main-table-tbody-td-test-class-display-index-${displayIndex}-col-index-${colIndex}`,
    ],
    tbodyTdInput: (origIndex, displayIndex, colIndex) => [
      `main-table-tbody-td-input-test-class-orig-index-${origIndex}-col-index-${colIndex}`,
      `main-table-tbody-td-input-test-class-display-index-${displayIndex}-col-index-${colIndex}`,
    ],
    editColTh: ["main-table-edit-col-th-test-class"],
    editColTd: (origIndex, displayIndex) => [
      `main-table-edit-col-td-test-class-orig-index-${origIndex}`,
      `main-table-edit-col-td-test-class-display-index-${displayIndex}`,
    ],
    editStartButton: (origIndex, displayIndex) => [
      `main-table-edit-start-button-test-class-orig-index-${origIndex}`,
      `main-table-edit-start-button-test-class-display-index-${displayIndex}`,
    ],
    editDeleteButton: (origIndex, displayIndex) => [
      `main-table-edit-delete-button-test-class-orig-index-${origIndex}`,
      `main-table-edit-delete-button-test-class-display-index-${displayIndex}`,
    ],
    editSaveButton: (origIndex, displayIndex) => [
      `main-table-edit-save-button-test-class-orig-index-${origIndex}`,
      `main-table-edit-save-button-test-class-display-index-${displayIndex}`,
    ],
    editCancelButton: (origIndex, displayIndex) => [
      `main-table-edit-cancel-button-test-class-orig-index-${origIndex}`,
      `main-table-edit-cancel-button-test-class-display-index-${displayIndex}`,
    ],
    rowSelectColTh: ["main-table-row-select-col-th-test-class"],
    rowSelectColTd: (origIndex, displayIndex) => [
      `main-table-row-select-call-td-test-class-orig-index-${origIndex}`,
      `main-table-row-select-call-td-test-class-display-index-${displayIndex}`,
    ],
    rowSelectInput: (origIndex, displayIndex) => [
      `main-table-row-select-input-test-class-orig-index-${origIndex}`,
      `main-table-row-select-input-test-class-display-index-${displayIndex}`,
    ],
  },
};

const MainTableStylingTestHarness: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [pageSizeIndex, setPageSizeIndex] = useState<number>(0);
  const pagination: GridPaginationState = useMemo(
    () => ({
      currentPage,
      setCurrentPage,
      pageSizeOptions,
      pageSizeIndex,
      setPageSizeIndex,
      maxPageButtons,
    }),
    [currentPage, pageSizeIndex],
  );

  const [sortColDef, setSortColDef] = useState<SortColDef | null>({
    name: "numCol",
    order: "desc",
  });
  const sortModel: TableSortModel = useMemo(
    () => ({
      sortColDef,
      setSortColDef,
    }),
    [sortColDef],
  );

  const [selected, setSelected] = useState<number[]>([]);
  const selectModel: MultiSelectModel = useMemo(() => ({
    mode: "both",
    type: "multi",
    selected,
    setSelected
  }), [selected])

  return (
    <Grid
      rows={rows}
      cols={cols}
      pagination={pagination}
      sortModel={sortModel}
      editModel={editModel}
      caption="test caption"
      styleModel={styleModel}
      selectModel={selectModel}
    />
  );
};

export default MainTableStylingTestHarness;
