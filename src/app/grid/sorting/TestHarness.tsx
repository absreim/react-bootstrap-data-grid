"use client";

import {
  cols,
  generateBasicTestRows,
} from "../../../test-tools/basic-test-data";
import { FC, useMemo, useState } from "react";
import Grid from "../../../grid";
import Form from "react-bootstrap/Form";

const sortedTestRows = generateBasicTestRows(5);
const reorderedTestRows = [2, 1, 4, 0, 3].map((index) => sortedTestRows[index]);

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
