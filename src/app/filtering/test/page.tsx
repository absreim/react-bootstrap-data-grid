"use client";

import { FC } from "react";
import { ColDef, EditableTableFilterState, RowDef } from "@/grid";
import FilteringTestHarness from "@/app/filtering/test/FilteringTestHarness";
import { dateToDatetimeInputStr, dateToInputStr } from "@/grid/util/datetime";

const numTestCols: ColDef[] = [
  {
    type: "number",
    name: "numCol",
    label: "Number Column",
    formatter: (value: number) => String(value),
  },
];

const numTestRows: RowDef[] = [
  {
    numCol: -1,
  },
  {
    numCol: 0,
  },
  {
    numCol: 0.99999,
  },
  {
    numCol: 1,
  },
  {
    numCol: 1.00001,
  },
];

const strTestCols: ColDef[] = [
  {
    type: "string",
    name: "strCol",
    label: "String Column",
  },
];

const strTestRows: RowDef[] = [
  {
    strCol: "foobar",
  },
  {
    strCol: "fizzbuzz",
  },
  {
    strCol: "foobarfizzbuzz",
  },
];

const dateTestCols: ColDef[] = [
  {
    type: "date",
    name: "dateCol",
    label: "Date Column",
    formatter: dateToInputStr,
  },
];

const dateTestRows: RowDef[] = [
  {
    dateCol: new Date("2022-12-25"),
  },
  {
    dateCol: new Date("2023-01-15"),
  },
  {
    dateCol: new Date("2023-06-30"),
  },
  {
    dateCol: new Date("2024-03-20"),
  },
];

const datetimeTestCols: ColDef[] = [
  {
    type: "datetime",
    name: "datetimeCol",
    label: "Datetime Column",
    formatter: dateToDatetimeInputStr,
  },
];

const datetimeTestRows: RowDef[] = [
  {
    datetimeCol: new Date("2022-12-25T23:59"),
  },
  {
    datetimeCol: new Date("2023-01-15T10:00"),
  },
  {
    datetimeCol: new Date("2023-01-15T20:00"),
  },
  {
    datetimeCol: new Date("2024-04-20T00:00"),
  },
];

const combinedTestCols: ColDef[] = [
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

const combinedTestRows: RowDef[] = [
  {
    strCol: "bc",
    numCol: 2,
    dateCol: new Date("2022-01-01"),
    datetimeCol: new Date("2022-01-01T01:01"),
  },
  {
    strCol: "adef",
    numCol: 1,
    dateCol: new Date("2023-02-02"),
    datetimeCol: new Date("2023-02-02T02:02"),
  },
  {
    strCol: "aghi",
    numCol: 3,
    dateCol: new Date("2025-04-04"),
    datetimeCol: new Date("2024-03-03T03:03"),
  },
  {
    strCol: "ajkl",
    numCol: 4,
    dateCol: new Date("2024-03-03"),
    datetimeCol: new Date("2025-04-04T04:04"),
  },
];

const lessThanFilterState: EditableTableFilterState = {
  numCol: {
    enabled: true,
    type: "number",
    scheme: "lessThan",
    numValue: 1,
  },
};

const greaterThanFilterState: EditableTableFilterState = {
  numCol: {
    enabled: true,
    type: "number",
    scheme: "greaterThan",
    numValue: 1,
  },
};

const equalToFilterState: EditableTableFilterState = {
  numCol: {
    enabled: true,
    type: "number",
    scheme: "equals",
    numValue: 1,
  },
};

const leqFilterState: EditableTableFilterState = {
  numCol: {
    enabled: true,
    type: "number",
    scheme: "lessOrEqual",
    numValue: 1,
  },
};

const geqFilterState: EditableTableFilterState = {
  numCol: {
    enabled: true,
    type: "number",
    scheme: "greaterOrEqual",
    numValue: 1,
  },
};

const containsFilterState: EditableTableFilterState = {
  strCol: {
    enabled: true,
    type: "string",
    scheme: "contains",
    searchString: "bar",
  },
};

const startsWithFilterState: EditableTableFilterState = {
  strCol: {
    enabled: true,
    type: "string",
    scheme: "startsWith",
    searchString: "foo",
  },
};

const endsWithFilterState: EditableTableFilterState = {
  strCol: {
    enabled: true,
    type: "string",
    scheme: "endsWith",
    searchString: "bar",
  },
};

const startFromDateFilterState: EditableTableFilterState = {
  dateCol: {
    enabled: true,
    type: "date",
    scheme: "startFrom",
    startDate: new Date("2023-01-15"),
  },
};

const endAtDateFilterState: EditableTableFilterState = {
  dateCol: {
    enabled: true,
    type: "date",
    scheme: "endAt",
    endDate: new Date("2023-06-30"),
  },
};

const betweenDatesFilterState: EditableTableFilterState = {
  dateCol: {
    enabled: true,
    type: "date",
    scheme: "between",
    startDate: new Date("2022-11-30"),
    endDate: new Date("2025-01-05"),
  },
};

const startFromDatetimeFilterState: EditableTableFilterState = {
  datetimeCol: {
    enabled: true,
    type: "datetime",
    scheme: "startFrom",
    startDate: new Date("2023-01-15T10:00"),
  },
};

const endAtDatetimeFilterState: EditableTableFilterState = {
  datetimeCol: {
    enabled: true,
    type: "datetime",
    scheme: "endAt",
    endDate: new Date("2024-04-20T00:01"),
  },
};

const betweenDatetimesFilterState: EditableTableFilterState = {
  datetimeCol: {
    enabled: true,
    type: "datetime",
    scheme: "between",
    startDate: new Date("2023-01-15T09:00"),
    endDate: new Date("2024-04-21T00:00"),
  },
};

const combinedFilterState: EditableTableFilterState = {
  strCol: {
    enabled: true,
    type: "string",
    scheme: "contains",
    searchString: "a",
  },
  numCol: {
    enabled: true,
    type: "number",
    scheme: "greaterOrEqual",
    numValue: 2,
  },
  dateCol: {
    enabled: true,
    type: "date",
    scheme: "endAt",
    endDate: new Date("2025-01-01"),
  },
  datetimeCol: {
    enabled: true,
    type: "datetime",
    scheme: "endAt",
    endDate: new Date("2025-01-01T00:00"),
  },
};

const Test: FC = () => {
  return (
    <>
      <div data-testid="number less than grid container">
        <FilteringTestHarness
          cols={numTestCols}
          rows={numTestRows}
          initialFilterState={lessThanFilterState}
        />
      </div>
      <div data-testid="number greater than grid container">
        <FilteringTestHarness
          cols={numTestCols}
          rows={numTestRows}
          initialFilterState={greaterThanFilterState}
        />
      </div>
      <div data-testid="number equals grid container">
        <FilteringTestHarness
          cols={numTestCols}
          rows={numTestRows}
          initialFilterState={equalToFilterState}
        />
      </div>
      <div data-testid="number leq grid container">
        <FilteringTestHarness
          cols={numTestCols}
          rows={numTestRows}
          initialFilterState={leqFilterState}
        />
      </div>
      <div data-testid="number geq grid container">
        <FilteringTestHarness
          cols={numTestCols}
          rows={numTestRows}
          initialFilterState={geqFilterState}
        />
      </div>
      <div data-testid="string contains grid container">
        <FilteringTestHarness
          cols={strTestCols}
          rows={strTestRows}
          initialFilterState={containsFilterState}
        />
      </div>
      <div data-testid="string starts with grid container">
        <FilteringTestHarness
          cols={strTestCols}
          rows={strTestRows}
          initialFilterState={startsWithFilterState}
        />
      </div>
      <div data-testid="string ends with grid container">
        <FilteringTestHarness
          cols={strTestCols}
          rows={strTestRows}
          initialFilterState={endsWithFilterState}
        />
      </div>
      <div data-testid="start date grid container">
        <FilteringTestHarness
          cols={dateTestCols}
          rows={dateTestRows}
          initialFilterState={startFromDateFilterState}
        />
      </div>
      <div data-testid="end date grid container">
        <FilteringTestHarness
          cols={dateTestCols}
          rows={dateTestRows}
          initialFilterState={endAtDateFilterState}
        />
      </div>
      <div data-testid="between dates grid container">
        <FilteringTestHarness
          cols={dateTestCols}
          rows={dateTestRows}
          initialFilterState={betweenDatesFilterState}
        />
      </div>
      <div data-testid="start datetime grid container">
        <FilteringTestHarness
          cols={datetimeTestCols}
          rows={datetimeTestRows}
          initialFilterState={startFromDatetimeFilterState}
        />
      </div>
      <div data-testid="end datetime grid container">
        <FilteringTestHarness
          cols={datetimeTestCols}
          rows={datetimeTestRows}
          initialFilterState={endAtDatetimeFilterState}
        />
      </div>
      <div data-testid="between datetimes grid container">
        <FilteringTestHarness
          cols={datetimeTestCols}
          rows={datetimeTestRows}
          initialFilterState={betweenDatetimesFilterState}
        />
      </div>
      <div data-testid="combined grid container">
        <FilteringTestHarness
          cols={combinedTestCols}
          rows={combinedTestRows}
          initialFilterState={combinedFilterState}
        />
      </div>
    </>
  );
};

export default Test;
