"use client";

import Grid, { ColDef, RowDef, UpdateCallbackGenerator } from "@/grid";
import { FC, useState } from "react";
import { dateToDatetimeInputStr, dateToInputStr } from "@/grid/util/datetime";

const cols: ColDef[] = [
  {
    name: "strCol",
    label: "String Column",
    type: "string",
  },
  {
    name: "numCol",
    label: "Number Column",
    type: "number",
  },
  {
    name: "dateCol",
    label: "Date Column",
    type: "date",
    formatter: dateToInputStr,
  },
  {
    name: "datetimeCol",
    label: "Datetime Column",
    type: "datetime",
    formatter: dateToDatetimeInputStr,
  },
];

const initRows: RowDef[] = [
  {
    strCol: "First Row",
    numCol: 1,
    dateCol: new Date("2026-01-01"),
    datetimeCol: new Date("2026-01-01T01:00"),
  },
  {
    strCol: "Second Row",
    numCol: 2,
    dateCol: new Date("2026-01-02"),
    datetimeCol: new Date("2026-01-02T02:00"),
  },
  {
    strCol: "Third Row",
    numCol: 3,
    dateCol: new Date("2026-01-03"),
    datetimeCol: new Date("2026-01-03T03:00"),
  },
];

const EditingTestHarness: FC = () => {
  const [rows, setRows] = useState<RowDef[]>(initRows.slice());
  const getUpdateCallback: UpdateCallbackGenerator =
    (origIndex) => (rowDef) => {
      const newRows = rows.slice();
      newRows[origIndex] = rowDef;
      setRows(newRows);
    };
  const getDeleteCallback: (origIndex: number) => () => void =
    (origIndex) => () => {
      setRows(rows.toSpliced(origIndex, 1));
    };

  return (
    <Grid
      rows={rows}
      cols={cols}
      editModel={{ getUpdateCallback, getDeleteCallback }}
    />
  );
};

export default EditingTestHarness;
