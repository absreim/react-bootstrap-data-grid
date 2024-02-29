import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import Grid, { ColDef, RowDef } from "../index";

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
    formatter: (value: Date) => "(A date)",
  },
  {
    type: "datetime",
    name: "datetime",
    label: "Datetime Column",
    formatter: (value: Date) => "(A datetime)",
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
];

const extraFieldRow: RowDef[] = [
  {
    strCol: "string",
    numCol: 0,
    date: Date(),
    datetime: Date(),
    extraField: "",
  },
];

const missingFieldRow: RowDef[] = [
  {
    strCol: "string",
    numCol: 0,
    date: Date(),
  },
];

it("Displays labels as column headings", () => {
  render(<Grid rows={rows} cols={cols} />);

  const colHeaderCells = screen.getAllByRole("columnheader");
  expect(colHeaderCells[0]).toHaveTextContent("String Column");
  expect(colHeaderCells[1]).toHaveTextContent("Number Column");
  expect(colHeaderCells[2]).toHaveTextContent("Date Column");
  expect(colHeaderCells[3]).toHaveTextContent("Datetime Column");
});

it("Applies formatters to values", () => {
  render(<Grid rows={rows} cols={cols} />);

  const rowElements = screen.getAllByRole("row");
  const firstDataRowCells = within(rowElements[1]).getAllByRole("cell");
  expect(firstDataRowCells[0]).toHaveTextContent("first row string");
  expect(firstDataRowCells[1]).toHaveTextContent("1");
  expect(firstDataRowCells[2]).toHaveTextContent("(A date)");
  expect(firstDataRowCells[3]).toHaveTextContent("(A datetime)");
});

it("Throws an error if a row object field does not exist in the column definition", () => {
  expect(() => {
    render(<Grid rows={extraFieldRow} cols={cols} />);
  }).toThrow();
});

it("Throws an error if a field in the column definition does not exist the data for a row", () => {
  expect(() => {
    render(<Grid rows={missingFieldRow} cols={cols} />);
  }).toThrow();
});
