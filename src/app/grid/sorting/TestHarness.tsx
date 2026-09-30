"use client";

import {
  cols,
  generateBasicTestRows,
} from "../../../test-tools/basic-test-data";
import { FC } from "react";
import Grid from "../../../grid";

const sortableCols = cols.map((col) => ({
  ...col,
  sortable: true,
}));

const sortedTestRows = generateBasicTestRows(5);
const reorderedTestRows = [2, 1, 4, 0, 3].map((index) => sortedTestRows[index]);

const TestHarness: FC = () => (
  <Grid
    rows={reorderedTestRows}
    cols={sortableCols}
    sortModel={{ type: "uncontrolled", initialSortColDef: null }}
  />
);

export default TestHarness;
