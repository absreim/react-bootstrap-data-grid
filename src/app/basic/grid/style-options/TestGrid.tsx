"use client";

import { FC } from "react";
import Grid from "@/grid";
import { generateBasicTestRows, cols } from "@/test-tools/basic-test-data";

const testRows = generateBasicTestRows(25);

const TestGrid: FC = () => (
  <Grid
    rows={testRows}
    cols={cols}
    width={400}
    height={300}
    stripes="rows"
    hover
    divider
    borders="full"
    small
    variant="primary"
    borderColorVariant="primary"
  />
);

export default TestGrid;
