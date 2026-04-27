"use client";

import Grid, {
  ColDef,
  dateToDatetimeInputStr,
  dateToInputStr,
  RowDef,
} from "@/grid";
import { FC } from "react";

interface ToolbarTestHarnessProps {
  // As of this writing, if filtering is not enabled, there is only one button
  // on the toolbar
  enableFiltering: boolean;
}

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
      dateCol: new Date("2026-04-01"),
      datetimeCol: new Date("2026-04-01T01:00"),
    },
  },
  {
    id: 1,
    data: {
      strCol: "Second Row",
      numCol: 2,
      dateCol: new Date("2026-04-02"),
      datetimeCol: new Date("2026-04-02T02:00"),
    },
  },
  {
    id: 2,
    data: {
      strCol: "Third Row",
      numCol: 3,
      dateCol: new Date("2026-04-03"),
      datetimeCol: new Date("2026-04-03T03:00"),
    },
  },
];

const cols: ColDef[] = [
  {
    type: "string",
    name: "strCol",
    label: "String Column",
  },
  {
    type: "number",
    name: "numCol",
    label: "Number Column",
  },
  {
    type: "date",
    name: "dateCol",
    label: "Date Column",
    formatter: dateToInputStr,
  },
  {
    type: "datetime",
    name: "datetimeCol",
    label: "Datetime Column",
    formatter: dateToDatetimeInputStr,
  },
];

const ToolbarTestHarness: FC<ToolbarTestHarnessProps> = ({
  enableFiltering,
}) => {
  return (
    <Grid
      rows={rows}
      cols={cols}
      useToolbar={true}
      filterModel={enableFiltering ? { type: "uncontrolled" } : undefined}
    />
  );
};

export default ToolbarTestHarness;
