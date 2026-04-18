"use client";

import { ProColDef, RowDef } from "@/grid-pro";
import { FC } from "react";
import GridPro from "@/grid-pro/GridPro";

const cols: ProColDef[] = [
  {
    name: "resizeSortTestCol",
    label: "Resizeable Sortable Column",
    type: "number",
    width: 150,
    resizeable: true,
    sortable: true,
  },
];

interface TestRow {
  resizeSortTestCol: number;
}

const rows: RowDef<TestRow>[] = [
  {
    id: 1,
    data: {
      resizeSortTestCol: 1,
    },
  },
  {
    id: 3,
    data: {
      resizeSortTestCol: 3,
    },
  },
  {
    id: 2,
    data: {
      resizeSortTestCol: 2,
    },
  },
];

const ResizeSortTestHarness: FC = () => (
  <GridPro
    displayMode="block"
    rows={rows}
    cols={cols}
    sortModel={{ type: "uncontrolled", initialSortColDef: null }}
  />
);

export default ResizeSortTestHarness;
