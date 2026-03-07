"use client";

import { FC, Fragment, ReactNode } from "react";
import { ColDef, RowDef, SortColDef } from "@/grid";
import SortTestHarness from "@/app/sorting/SortTestHarness";

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
    id: 0,
    data: {
      strCol: "a",
      numCol: 10,
      dateCol: new Date(1),
      datetimeCol: new Date(1),
      unsortableCol: "x",
    },
  },
  {
    id: 1,
    data: {
      strCol: "c",
      numCol: 1,
      dateCol: new Date(2),
      datetimeCol: new Date(2),
      unsortableCol: "y",
    },
  },
  {
    id: 2,
    data: {
      strCol: "b",
      numCol: 2,
      dateCol: new Date(10),
      datetimeCol: new Date(10),
      unsortableCol: "z",
    },
  },
];

interface TestParams {
  testId: string;
  initialSortDef: SortColDef | null;
}

const getTestHarnessPair: (testParams: TestParams) => ReactNode = ({
  testId,
  initialSortDef,
}) => (
  <Fragment key={testId}>
    <div data-testid={`${testId}-controlled`}>
      <SortTestHarness
        cols={cols}
        rows={rows}
        initialSortDef={initialSortDef}
        controlled
      />
    </div>
    <div data-testid={`${testId}-uncontrolled`}>
      <SortTestHarness
        cols={cols}
        rows={rows}
        initialSortDef={initialSortDef}
        controlled={false}
      />
    </div>
  </Fragment>
);

const testParamsList: TestParams[] = [
  {
    testId: "sorted unsortable column test case",
    initialSortDef: { name: "unsortableCol", order: "desc" },
  },
  {
    testId: "unsorted to sorted test case",
    initialSortDef: null,
  },
  {
    testId: "ascending to descending test case",
    initialSortDef: { name: "strCol", order: "asc" },
  },
  {
    testId: "descending to unsorted test case",
    initialSortDef: { name: "strCol", order: "desc" },
  },
  {
    testId: "number sort test case",
    initialSortDef: { name: "numCol", order: "asc" },
  },
  {
    testId: "date sort test case",
    initialSortDef: { name: "dateCol", order: "asc" },
  },
  {
    testId: "datetime sort test case",
    initialSortDef: { name: "datetimeCol", order: "asc" },
  },
];

const Test: FC = () => {
  return <>{testParamsList.map(getTestHarnessPair)}</>;
};

export default Test;
