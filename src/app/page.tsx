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
    width: 150,
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

interface TestRow {
  strCol: string;
  numCol: number;
  date: Date;
  datetime: Date;
}

const rows: RowDef<TestRow>[] = [
  {
    id: 0,
    data: {
      strCol: "first row string",
      numCol: 1,
      date: new Date(),
      datetime: new Date(),
    },
  },
  {
    id: 1,
    data: {
      strCol: "second row string",
      numCol: 2,
      date: new Date(),
      datetime: new Date(),
    },
  },
  {
    id: 2,
    data: {
      strCol: "third row string",
      numCol: 3,
      date: new Date(),
      datetime: new Date(),
    },
  },
  {
    id: 3,
    data: {
      strCol: "fourth row string",
      numCol: 4,
      date: new Date(),
      datetime: new Date(),
    },
  },
  {
    id: 4,
    data: {
      strCol: "fifth row string",
      numCol: 5,
      date: new Date(),
      datetime: new Date(),
    },
  },
];

const Test: FC = () => {
  return (
    <>
      <div data-testid="functioning grid container">
        <Grid rows={rows} cols={cols} caption="basic test grid" />
      </div>
      <div data-testid="responsive grid container">
        <Grid rows={rows} cols={cols} responsive={true} />
      </div>
      <div data-testid="block grid container">
        <Grid rows={rows} cols={cols} displayMode="block" />
      </div>
    </>
  );
};

export default Test;
