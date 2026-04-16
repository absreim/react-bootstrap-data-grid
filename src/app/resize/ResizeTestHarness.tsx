"use client";

import { RowDef, StyleModel } from "@/grid-pro";
import { FC } from "react";
import { dateToDatetimeInputStr, dateToInputStr } from "@/grid-pro";
import GridPro from "@/grid-pro/GridPro";
import { ProColDef } from "@/grid-pro/types";

const cols: ProColDef[] = [
  {
    name: "strCol",
    label: "String Column",
    type: "string",
    width: 100,
    resizeable: true,
  },
  {
    name: "numCol",
    label: "Number Column",
    type: "number",
    width: 100,
  },
  {
    name: "dateCol",
    label: "Date Column",
    type: "date",
    formatter: dateToInputStr,
    width: 150,
    resizeable: true,
  },
  {
    name: "datetimeCol",
    label: "Datetime Column",
    type: "datetime",
    formatter: dateToDatetimeInputStr,
  },
];

interface TestRow {
  strCol: string;
  numCol: number;
  dateCol: Date;
  datetimeCol: Date;
}

const rows: RowDef<TestRow>[] = [
  {
    id: 0,
    data: {
      strCol: "First Row",
      numCol: 1,
      dateCol: new Date("2026-01-01"),
      datetimeCol: new Date("2026-01-01T01:00"),
    },
  },
  {
    id: 1,
    data: {
      strCol: "Second Row",
      numCol: 2,
      dateCol: new Date("2026-01-02"),
      datetimeCol: new Date("2026-01-02T02:00"),
    },
  },
  {
    id: 2,
    data: {
      strCol: "Third Row",
      numCol: 3,
      dateCol: new Date("2026-01-03"),
      datetimeCol: new Date("2026-01-03T03:00"),
    },
  },
];

const styleModel: StyleModel = {
  mainTableStyleModel: {
    tbodyTd: () => ["overflow-x-hidden", "resize-test-data-cell"],
  },
};

const ResizeTestHarness: FC = () => {
  return (
    <GridPro
      displayMode="block"
      rows={rows}
      cols={cols}
      styleModel={styleModel}
    />
  );
};

export default ResizeTestHarness;
