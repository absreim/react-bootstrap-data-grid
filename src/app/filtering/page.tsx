"use client";

import { FC, Fragment } from "react";
import { ColDef, EditableTableFilterState, RowDef } from "@/grid";
import FilteringTestHarness from "@/app/filtering/FilteringTestHarness";
import { dateToDatetimeInputStr, dateToInputStr } from "@/grid/util/datetime";
import NoInitStateTestHarness from "@/app/filtering/NoInitStateTestHarness";

const numTestCols: ColDef[] = [
  {
    type: "number",
    name: "numCol",
    label: "Number Column",
    formatter: (value: number) => String(value),
  },
];

const numTestRows: RowDef<{ numCol: number }>[] = [
  {
    id: 0,
    data: {
      numCol: -1,
    },
  },
  {
    id: 1,
    data: {
      numCol: 0,
    },
  },
  {
    id: 2,
    data: {
      numCol: 0.99999,
    },
  },
  {
    id: 3,
    data: {
      numCol: 1,
    },
  },
  {
    id: 4,
    data: {
      numCol: 1.00001,
    },
  },
];

const strTestCols: ColDef[] = [
  {
    type: "string",
    name: "strCol",
    label: "String Column",
  },
];

const strTestRows: RowDef<{ strCol: string }>[] = [
  {
    id: "0",
    data: {
      strCol: "foobar",
    },
  },
  {
    id: "1",
    data: {
      strCol: "fizzbuzz",
    },
  },
  {
    id: "2",
    data: {
      strCol: "foobarfizzbuzz",
    },
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

const dateTestRows: RowDef<{ dateCol: Date }>[] = [
  {
    id: "0",
    data: {
      dateCol: new Date("2022-12-25"),
    },
  },
  {
    id: "1",
    data: {
      dateCol: new Date("2023-01-15"),
    },
  },
  {
    id: "2",
    data: {
      dateCol: new Date("2023-06-30"),
    },
  },
  {
    id: "3",
    data: {
      dateCol: new Date("2024-03-20"),
    },
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

const datetimeTestRows: RowDef<{ datetimeCol: Date }>[] = [
  {
    id: 0,
    data: {
      datetimeCol: new Date("2022-12-25T23:59"),
    },
  },
  {
    id: 1,
    data: {
      datetimeCol: new Date("2023-01-15T10:00"),
    },
  },
  {
    id: 2,
    data: {
      datetimeCol: new Date("2023-01-15T20:00"),
    },
  },
  {
    id: 3,
    data: {
      datetimeCol: new Date("2024-04-20T00:00"),
    },
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

interface CombinedTestRow {
  strCol: string;
  numCol: number;
  dateCol: Date;
  datetimeCol: Date;
}

const combinedTestRows: RowDef<CombinedTestRow>[] = [
  {
    id: 0,
    data: {
      strCol: "bc",
      numCol: 2,
      dateCol: new Date("2022-01-01"),
      datetimeCol: new Date("2022-01-01T01:01"),
    },
  },
  {
    id: 1,
    data: {
      strCol: "adef",
      numCol: 1,
      dateCol: new Date("2023-02-02"),
      datetimeCol: new Date("2023-02-02T02:02"),
    },
  },
  {
    id: 2,
    data: {
      strCol: "aghi",
      numCol: 3,
      dateCol: new Date("2025-04-04"),
      datetimeCol: new Date("2024-03-03T03:03"),
    },
  },
  {
    id: 3,
    data: {
      strCol: "ajkl",
      numCol: 4,
      dateCol: new Date("2024-03-03"),
      datetimeCol: new Date("2025-04-04T04:04"),
    },
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

interface TestParams {
  testId: string;
  cols: ColDef[];
  rows: RowDef[];
  initialState: EditableTableFilterState;
  caption?: string;
  useToolbar?: boolean;
}

const testParamsList: TestParams[] = [
  {
    testId: "number less than grid container",
    cols: numTestCols,
    rows: numTestRows,
    initialState: lessThanFilterState,
  },
  {
    testId: "number greater than grid container",
    cols: numTestCols,
    rows: numTestRows,
    initialState: greaterThanFilterState,
  },
  {
    testId: "number equals grid container",
    cols: numTestCols,
    rows: numTestRows,
    initialState: equalToFilterState,
  },
  {
    testId: "number leq grid container",
    cols: numTestCols,
    rows: numTestRows,
    initialState: leqFilterState,
  },
  {
    testId: "number geq grid container",
    cols: numTestCols,
    rows: numTestRows,
    initialState: geqFilterState,
  },
  {
    testId: "string contains grid container",
    cols: strTestCols,
    rows: strTestRows,
    initialState: containsFilterState,
  },
  {
    testId: "string starts with grid container",
    cols: strTestCols,
    rows: strTestRows,
    initialState: startsWithFilterState,
  },
  {
    testId: "string ends with grid container",
    cols: strTestCols,
    rows: strTestRows,
    initialState: endsWithFilterState,
  },
  {
    testId: "start date grid container",
    cols: dateTestCols,
    rows: dateTestRows,
    initialState: startFromDateFilterState,
  },
  {
    testId: "end date grid container",
    cols: dateTestCols,
    rows: dateTestRows,
    initialState: endAtDateFilterState,
  },
  {
    testId: "between dates grid container",
    cols: dateTestCols,
    rows: dateTestRows,
    initialState: betweenDatesFilterState,
  },
  {
    testId: "start datetime grid container",
    cols: datetimeTestCols,
    rows: datetimeTestRows,
    initialState: startFromDatetimeFilterState,
  },
  {
    testId: "end datetime grid container",
    cols: datetimeTestCols,
    rows: datetimeTestRows,
    initialState: endAtDatetimeFilterState,
  },
  {
    testId: "between datetimes grid container",
    cols: datetimeTestCols,
    rows: datetimeTestRows,
    initialState: betweenDatetimesFilterState,
  },
  {
    testId: "combined grid container",
    cols: combinedTestCols,
    rows: combinedTestRows,
    initialState: combinedFilterState,
  },
  {
    testId: "caption test grid container",
    cols: combinedTestCols,
    rows: combinedTestRows,
    initialState: combinedFilterState,
    caption: "filter table test caption",
  },
  {
    testId: "toolbar filtering interface grid container",
    cols: combinedTestCols,
    rows: combinedTestRows,
    initialState: combinedFilterState,
    caption: "This table should appear underneath the toolbar",
    useToolbar: true,
  },
];

const Test: FC = () => {
  return (
    <>
      {testParamsList.map(
        ({ testId, cols, rows, initialState, caption, useToolbar }) => (
          <Fragment key={testId}>
            <div data-testid={`${testId}-controlled`}>
              <FilteringTestHarness
                cols={cols}
                rows={rows}
                initialFilterState={initialState}
                controlled
                caption={caption}
                useToolbar={useToolbar}
              />
            </div>
            <div data-testid={`${testId}-uncontrolled`}>
              <FilteringTestHarness
                cols={cols}
                rows={rows}
                initialFilterState={initialState}
                controlled={false}
                caption={caption}
                useToolbar={useToolbar}
              />
            </div>
          </Fragment>
        ),
      )}
      <div data-testid={"no initial state grid container"}>
        <NoInitStateTestHarness
          cols={combinedTestCols}
          rows={combinedTestRows}
        />
      </div>
    </>
  );
};

export default Test;
