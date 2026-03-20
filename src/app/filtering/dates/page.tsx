"use client";

import { FC, Fragment } from "react";
import { ColDef, EditableTableFilterState, RowDef } from "@/grid";
import FilteringTestHarness from "@/app/filtering/FilteringTestHarness";
import { dateToDatetimeInputStr, dateToInputStr } from "@/grid/util/datetime";

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
    </>
  );
};

export default Test;
