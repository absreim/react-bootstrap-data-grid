import { FC, Fragment } from "react";
import {
  ColDef,
  dateToInputStr,
  EditableTableFilterState,
  RowDef,
} from "@/grid";
import { TestParams } from "@/app/filtering/types";
import FilteringTestHarness from "@/app/filtering/FilteringTestHarness";

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
];

const TestDivs: FC<{ pro?: boolean }> = ({ pro }) => (
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
              pro={pro}
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
              pro={pro}
            />
          </div>
        </Fragment>
      ),
    )}
  </>
);

export default TestDivs;
