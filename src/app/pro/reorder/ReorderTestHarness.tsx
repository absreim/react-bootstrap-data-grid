"use client";

import { dateToDatetimeInputStr, dateToInputStr, RowDef } from "@/grid";
import GridPro, { ProColDef } from "@/grid-pro";
import { FC, useCallback, useState } from "react";
import { ReorderCallback } from "@/grid-pro/reorder/types";

interface TestRow {
  strCol: string;
  numCol: number;
  dateCol: Date;
  datetimeCol: Date;
}

const initRows: RowDef<TestRow>[] = [
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

const cols: ProColDef[] = [
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

const ReorderTestHarness: FC = () => {
  const [rows, setRows] = useState(initRows);
  const reorderCallback: ReorderCallback = useCallback(
    (id, destIndex) => {
      const rowsCopy = rows.slice();
      const srcIndex = rowsCopy.findIndex((rowsCopy) => rowsCopy.id === id);
      const srcContents = rowsCopy[srcIndex];
      rowsCopy.splice(srcIndex, 1);

      if (destIndex === 0) {
        rowsCopy.splice(0, 0, srcContents);
        setRows(rowsCopy);
        return;
      }

      if (srcIndex < destIndex) {
        rowsCopy.splice(destIndex - 1, 0, srcContents);
        setRows(rowsCopy);
        return;
      }

      rowsCopy.splice(destIndex, 0, srcContents);
      setRows(rowsCopy);
    },
    [rows],
  );

  return (
    <GridPro
      rows={rows}
      cols={cols}
      reorder={{ callback: reorderCallback }}
    />
  );
};

export default ReorderTestHarness;
