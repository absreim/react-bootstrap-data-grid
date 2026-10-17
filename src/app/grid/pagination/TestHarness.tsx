"use client";

import { cols, generateBasicTestRows } from "../../../test-tools/basic-test-data";
import { FC } from "react";
import Grid from "../../../grid";

const testRows = generateBasicTestRows(25);

const TestHarness: FC = () => (
  <Grid rows={testRows} cols={cols} pagination={{
    type: "uncontrolled",
    pageSizeOptions: [5, 10],
  }} />
)

export default TestHarness;
