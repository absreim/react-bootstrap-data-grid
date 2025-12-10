"use client"

import { FC } from "react";
import { ColDef, RowDef } from "@/grid";
import SortTestHarness from "@/app/sorting/test/SortTestHarness";

const cols: ColDef[] = [
  {
    type: "string",
    name: "strCol",
    label: "String Column",
    sortable: true,
  },
  {
    type: "number",
    name: "numCol",
    label: "Number Column",
    sortable: true,
  },
  {
    type: "date",
    name: "dateCol",
    label: "Date Column",
    formatter: (date: Date) => String(date.valueOf()),
    sortable: true,
  },
  {
    type: "datetime",
    name: "datetimeCol",
    label: "Datetime Column",
    formatter: (date: Date) => String(date.valueOf()),
    sortable: true,
  },
  {
    type: "string",
    name: "unsortableCol",
    label: "Unsortable String Column",
    sortable: false,
  },
];

const rows: RowDef[] = [
  {
    strCol: "a",
    numCol: 10,
    dateCol: new Date(1),
    datetimeCol: new Date(1),
    unsortableCol: "x",
  },
  {
    strCol: "c",
    numCol: 1,
    dateCol: new Date(2),
    datetimeCol: new Date(2),
    unsortableCol: "y",
  },
  {
    strCol: "b",
    numCol: 2,
    dateCol: new Date(10),
    datetimeCol: new Date(10),
    unsortableCol: "z",
  },
];

const Test: FC = () => {
  return (
    <>
      <div data-testid="sorted unsortable column test case">
        <SortTestHarness
          cols={cols}
          rows={rows}
          initialSortDef={{ name: "unsortableCol", order: "desc" }}
        />
      </div>
      <div data-testid="unsorted to sorted test case">
        <SortTestHarness cols={cols} rows={rows} initialSortDef={null} />
      </div>
      <div data-testid="ascending to descending test case">
        <SortTestHarness
          cols={cols}
          rows={rows}
          initialSortDef={{ name: "strCol", order: "asc" }}
        />
      </div>
      <div data-testid="descending to unsorted test case">
        <SortTestHarness
          cols={cols}
          rows={rows}
          initialSortDef={{ name: "strCol", order: "desc" }}
        />
      </div>
      <div data-testid="number sort test case">
        <SortTestHarness
          cols={cols}
          rows={rows}
          initialSortDef={{ name: "numCol", order: "asc" }}
        />
      </div>
      <div data-testid="date sort test case">
        <SortTestHarness
          cols={cols}
          rows={rows}
          initialSortDef={{ name: "dateCol", order: "asc" }}
        />
      </div>
      <div data-testid="datetime sort test case">
        <SortTestHarness
          cols={cols}
          rows={rows}
          initialSortDef={{ name: "datetimeCol", order: "asc" }}
        />
      </div>
    </>
  );
}

export default Test;
