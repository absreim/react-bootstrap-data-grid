"use client";

import { FC } from "react";
import Grid, { ColDef, RowDef } from "@/grid";

const cols: ColDef[] = [
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
    name: "date",
    label: "Date Column",
    formatter: () => "(A date)",
  },
  {
    type: "datetime",
    name: "datetime",
    label: "Datetime Column",
    formatter: () => "(A datetime)",
  },
];

const rows: RowDef[] = [
  {
    strCol: "first row string",
    numCol: 1,
    date: Date(),
    datetime: Date(),
  },
  {
    strCol: "second row string",
    numCol: 2,
    date: Date(),
    datetime: Date(),
  },
  {
    strCol: "third row string",
    numCol: 3,
    date: Date(),
    datetime: Date(),
  },
  {
    strCol: "fourth row string",
    numCol: 4,
    date: Date(),
    datetime: Date(),
  },
  {
    strCol: "fifth row string",
    numCol: 5,
    date: Date(),
    datetime: Date(),
  },
];

const Test: FC = () => {
  return (
    <>
      <div data-testid="functioning grid container">
        <Grid rows={rows} cols={cols} caption="basic test grid"></Grid>
      </div>
    </>
  );
};

export default Test;
