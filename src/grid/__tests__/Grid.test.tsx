import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import Grid, { ColDef, GridPaginationState, RowDef } from "../index";
import { FC, useState } from "react";
import userEvent from "@testing-library/user-event";

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

const paginationState: GridPaginationState = {
  pageSizeOptions: [3, 5, 10],
  pageSizeIndex: 0,
  setPageSizeIndex: () => {},
  currentPage: 2,
  setCurrentPage: () => {},
  maxPageButtons: 5,
};

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

it("Displays the appropriate rows when pagination is enabled", () => {
  render(<Grid rows={rows} cols={cols} pagination={paginationState} />);

  const rowElements = screen.getAllByRole("row");
  const firstDataRowCells = within(rowElements[1]).getAllByRole("cell");
  const secondDataRowCells = within(rowElements[2]).getAllByRole("cell");

  expect(rowElements.length).toBe(3);
  expect(firstDataRowCells[0]).toHaveTextContent("fourth row string");
  expect(secondDataRowCells[0]).toHaveTextContent("fifth row string");
});

const PaginationStateContainer: FC = () => {
  const [pageSizeIndex, setPageSizeIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSizeOptions = [3, 5, 10];
  const maxPageButtons = 5;

  const paginationState: GridPaginationState = {
    pageSizeOptions,
    pageSizeIndex: pageSizeIndex,
    setPageSizeIndex: setPageSizeIndex,
    currentPage,
    setCurrentPage,
    maxPageButtons,
  };

  return <Grid rows={rows} cols={cols} pagination={paginationState} />;
};

it("Responds appropriately to a user selecting a different page size", async () => {
  const user = userEvent.setup();
  render(<PaginationStateContainer />);

  await user.selectOptions(
    screen.getByRole("combobox", { name: "Number of Rows per Page" }),
    "1",
  );
  const rowElements = screen.getAllByRole("row");

  expect(rowElements.length).toBe(6);
});
