"use client";

import {
  cols,
  generateBasicTestRows,
} from "../../../test-tools/basic-test-data";
import { FC, useMemo, useState } from "react";
import Grid from "../../../grid";
import Form from "react-bootstrap/Form";
import { BasicTestRow } from "../../../test-tools/types";

const sortedTestRows = generateBasicTestRows(5);
const newOrder: Record<keyof BasicTestRow, number[]> = {
  strCol: [4, 3, 2, 1, 0],
  numCol: [0, 1, 2, 3, 4],
  date: [2, 4, 0, 1, 3],
  datetime: [3, 2, 0, 4, 1],
};
const reorderedTestRows = new Array(5).fill(0).map((_, i) => ({
  id: i,
  data: {
    strCol: sortedTestRows[newOrder.strCol[i]].data.strCol,
    numCol: sortedTestRows[newOrder.numCol[i]].data.numCol,
    date: sortedTestRows[newOrder.date[i]].data.date,
    datetime: sortedTestRows[newOrder.datetime[i]].data.datetime,
  },
}));

const TestHarness: FC = () => {
  const [sortingEnabled, setSortingEnabled] = useState(
    cols.reduce(
      (prev, curr) => {
        prev[curr.name] = true;
        return prev;
      },
      {} as Record<string, boolean>,
    ),
  );
  const sortableCols = useMemo(
    () =>
      cols.map((col) => ({
        ...col,
        sortable: sortingEnabled[col.name],
      })),
    [sortingEnabled],
  );

  return (
    <>
      <Form>
        <fieldset>
          <legend>Enable Sorting by Column</legend>
          {cols.map((col) => (
            <Form.Check
              key={col.name}
              type="switch"
              id={`${col.name}ToggleSortable`}
              label={col.label}
              checked={sortingEnabled[col.name]}
              onChange={({ target }) =>
                setSortingEnabled({
                  ...sortingEnabled,
                  [col.name]: target.checked,
                })
              }
            />
          ))}
        </fieldset>
      </Form>
      <Grid
        rows={reorderedTestRows}
        cols={sortableCols}
        sortModel={{ type: "uncontrolled", initialSortColDef: null }}
      />
    </>
  );
};

export default TestHarness;
