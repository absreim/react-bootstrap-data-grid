"use client";

import Grid, {
  ColDef,
  EditModel,
  PaginationModel,
  MultiSelectModel,
  RowDef,
  RowId,
  SortColDef,
  StyleModel,
  TableSortModel,
} from "@/grid";
import { FC, useMemo, useState } from "react";
import GridPro from "@/grid-pro";

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

export interface MainStylingTestHarnessProps {
  pro?: boolean;
  styleModel?: StyleModel;
}

const MainStylingTestHarness: FC<MainStylingTestHarnessProps> = ({
  pro,
  styleModel,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [pageSizeIndex, setPageSizeIndex] = useState<number>(0);
  const pagination: PaginationModel = useMemo(
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

  if (pro) {
    return (
      <GridPro
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
  }

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

export default MainStylingTestHarness;
