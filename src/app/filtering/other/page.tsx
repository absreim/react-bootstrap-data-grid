"use client";

import { FC, Fragment } from "react";
import { ColDef, EditableTableFilterState, RowDef } from "@/grid";
import FilteringTestHarness from "@/app/filtering/FilteringTestHarness";

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
