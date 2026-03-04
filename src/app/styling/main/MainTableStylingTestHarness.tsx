"use client";

import Grid, {
  ColDef,
  EditModel,
  GridPaginationState,
  MultiSelectModel,
  RowDef,
  RowId,
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
    id: 0,
    data: {
      strCol: "First Row",
      numCol: 1,
    },
  },
  {
    id: 1,
    data: {
      strCol: "Second Row",
      numCol: 2,
    },
  },
  {
    id: 2,
    data: {
      strCol: "Third Row",
      numCol: 3,
    },
  },
  {
    id: 3,
    data: {
      strCol: "Fourth Row",
      numCol: 4,
    },
  },
  {
    id: 4,
    data: {
      strCol: "Fifth Row",
      numCol: 5,
    },
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

  const [selected, setSelected] = useState<RowId[]>([]);
  const selectModel: MultiSelectModel = useMemo(
    () => ({
      mode: "both",
      type: "multi",
      selected,
      setSelected,
    }),
    [selected],
  );

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
