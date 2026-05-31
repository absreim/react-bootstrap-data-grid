import { FC, Fragment } from "react";
import {
  ColDef,
  dateToDatetimeInputStr,
  dateToInputStr,
  EditableTableFilterState,
  RowDef,
} from "@/grid";
import { TestParams } from "@/app/filtering/types";
import FilteringTestHarness from "@/app/filtering/FilteringTestHarness";
import NoInitStateTestHarness from "@/app/filtering/NoInitStateTestHarness";

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

const testParamsList: TestParams[] = [
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
    testId: "toolbar interface grid container",
    cols: combinedTestCols,
    rows: combinedTestRows,
    initialState: combinedFilterState,
    caption: "This table should appear underneath the toolbar",
  },
];

const TestDivs: FC<{ pro?: boolean }> = ({ pro }) => (
  <>
    {testParamsList.map(({ testId, cols, rows, initialState, caption }) => (
      <Fragment key={testId}>
        <div data-testid={`${testId}-controlled`}>
          <FilteringTestHarness
            cols={cols}
            rows={rows}
            initialFilterState={initialState}
            controlled
            caption={caption}
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
            pro={pro}
          />
        </div>
      </Fragment>
    ))}
    <div data-testid={"no initial state grid container"}>
      <NoInitStateTestHarness
        cols={combinedTestCols}
        rows={combinedTestRows}
        pro={pro}
      />
    </div>
  </>
);

export default TestDivs;
