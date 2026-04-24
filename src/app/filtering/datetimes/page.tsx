"use client";

import { FC, Fragment } from "react";
import { ColDef, EditableTableFilterState, RowDef } from "@/grid";
import FilteringTestHarness from "@/app/filtering/FilteringTestHarness";
import { dateToDatetimeInputStr } from "@/grid/util/datetime";
import { TestParams } from "@/app/filtering/types";

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

const testParamsList: TestParams[] = [
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
