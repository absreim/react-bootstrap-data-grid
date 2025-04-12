import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import Grid, { ColDef, RowDef, SortColDef, TableSortModel } from "@/grid";
import { FC, useState } from "react";
import userEvent from "@testing-library/user-event";

const cols: ColDef[] = [
  {
    type: "string",
    name: "strCol",
    label: "String Column",
    sortable: true,
  },
  {
    type: "number",
    name: "numCol",
    label: "Number Column",
    sortable: true,
  },
  {
    type: "date",
    name: "dateCol",
    label: "Date Column",
    formatter: (date: Date) => String(date.valueOf()),
    sortable: true,
  },
  {
    type: "datetime",
    name: "datetimeCol",
    label: "Datetime Column",
    formatter: (date: Date) => String(date.valueOf()),
    sortable: true,
  },
  {
    type: "string",
    name: "unsortableCol",
    label: "Unsortable String Column",
    sortable: false,
  },
];

const rows: RowDef[] = [
  {
    strCol: "a",
    numCol: 10,
    dateCol: new Date(1),
    datetimeCol: new Date(1),
    unsortableCol: "x",
  },
  {
    strCol: "c",
    numCol: 1,
    dateCol: new Date(2),
    datetimeCol: new Date(2),
    unsortableCol: "y",
  },
  {
    strCol: "b",
    numCol: 2,
    dateCol: new Date(10),
    datetimeCol: new Date(10),
    unsortableCol: "z",
  },
];

interface SortTestHarnessProps {
  cols: ColDef[];
  rows: RowDef[];
  initialSortDef: SortColDef | null;
}

const SortTestHarness: FC<SortTestHarnessProps> = ({
  cols,
  rows,
  initialSortDef,
}) => {
  const [sortColDef, setSortColDef] = useState<SortColDef | null>(
    initialSortDef,
  );

  const tableSortModel: TableSortModel = {
    sortColDef,
    setSortColDef,
  };

  return <Grid rows={rows} cols={cols} sortModel={tableSortModel} />;
};

it("Sorts unsortable columns if the initial model calls for it to be sorted", () => {
  render(
    <SortTestHarness
      cols={cols}
      rows={rows}
      initialSortDef={{ name: "unsortableCol", order: "desc" }}
    />,
  );

  const rowElements = screen.getAllByRole("row");
  const firstDataRowCells = within(rowElements[1]).getAllByRole("cell");
  const secondDataRowCells = within(rowElements[2]).getAllByRole("cell");
  const thirdDataRowCells = within(rowElements[3]).getAllByRole("cell");
  const unsortableRowOneCell = firstDataRowCells[4];
  const unsortableRowTwoCell = secondDataRowCells[4];
  const unsortableRowThreeCell = thirdDataRowCells[4];

  expect(unsortableRowOneCell).toHaveTextContent("z");
  expect(unsortableRowTwoCell).toHaveTextContent("y");
  expect(unsortableRowThreeCell).toHaveTextContent("x");
});

it("Does not change sort order after clicking on an unsortable column", async () => {
  const user = userEvent.setup();
  render(
    <SortTestHarness
      cols={cols}
      rows={rows}
      initialSortDef={{ name: "strCol", order: "asc" }}
    />,
  );

  const strColHeaderCell = screen.getByRole("columnheader", {
    name: "Unsortable String Column",
  });
  await user.click(strColHeaderCell);

  screen.getByRole("columnheader", {
    name: "String Column (sorted ascending)",
  });

  const rowElements = screen.getAllByRole("row");
  const firstDataRowCells = within(rowElements[1]).getAllByRole("cell");
  const secondDataRowCells = within(rowElements[2]).getAllByRole("cell");
  const thirdDataRowCells = within(rowElements[3]).getAllByRole("cell");
  const unsortableRowOneCell = firstDataRowCells[4];
  const unsortableRowTwoCell = secondDataRowCells[4];
  const unsortableRowThreeCell = thirdDataRowCells[4];

  expect(unsortableRowOneCell).toHaveTextContent("x");
  expect(unsortableRowTwoCell).toHaveTextContent("z");
  expect(unsortableRowThreeCell).toHaveTextContent("y");
});

it("Sorts an unsorted column in ascending order after first clicking on it", async () => {
  const user = userEvent.setup();
  render(<SortTestHarness cols={cols} rows={rows} initialSortDef={null} />);

  const strColHeaderCell = screen.getByRole("columnheader", {
    name: "String Column",
  });
  await user.click(strColHeaderCell);

  screen.getByRole("columnheader", {
    name: "String Column (sorted ascending)",
  });
  const rowElements = screen.getAllByRole("row");
  const firstDataRowCells = within(rowElements[1]).getAllByRole("cell");
  const secondDataRowCells = within(rowElements[2]).getAllByRole("cell");
  const thirdDataRowCells = within(rowElements[3]).getAllByRole("cell");
  const strColRowOneCell = firstDataRowCells[0];
  const strColRowTwoCell = secondDataRowCells[0];
  const strColRowThreeCell = thirdDataRowCells[0];

  expect(strColRowOneCell).toHaveTextContent("a");
  expect(strColRowTwoCell).toHaveTextContent("b");
  expect(strColRowThreeCell).toHaveTextContent("c");
});

it("Sorts a column starting in ascending order to descending order after clicking on it", async () => {
  const user = userEvent.setup();
  render(
    <SortTestHarness
      cols={cols}
      rows={rows}
      initialSortDef={{ name: "strCol", order: "asc" }}
    />,
  );

  const strColHeaderCell = screen.getByRole("columnheader", {
    name: "String Column (sorted ascending)",
  });
  await user.click(strColHeaderCell);

  screen.getByRole("columnheader", {
    name: "String Column (sorted descending)",
  });
  const rowElements = screen.getAllByRole("row");
  const firstDataRowCells = within(rowElements[1]).getAllByRole("cell");
  const secondDataRowCells = within(rowElements[2]).getAllByRole("cell");
  const thirdDataRowCells = within(rowElements[3]).getAllByRole("cell");
  const strColRowOneCell = firstDataRowCells[0];
  const strColRowTwoCell = secondDataRowCells[0];
  const strColRowThreeCell = thirdDataRowCells[0];

  expect(strColRowOneCell).toHaveTextContent("c");
  expect(strColRowTwoCell).toHaveTextContent("b");
  expect(strColRowThreeCell).toHaveTextContent("a");
});

it("Stops sorting after clicking on a column heading for which the column is being sorted in descending order", async () => {
  const user = userEvent.setup();
  render(
    <SortTestHarness
      cols={cols}
      rows={rows}
      initialSortDef={{ name: "strCol", order: "desc" }}
    />,
  );

  const strColHeaderCell = screen.getByRole("columnheader", {
    name: "String Column (sorted descending)",
  });
  await user.click(strColHeaderCell);

  screen.getByRole("columnheader", {
    name: "String Column",
  });
  const rowElements = screen.getAllByRole("row");
  const firstDataRowCells = within(rowElements[1]).getAllByRole("cell");
  const secondDataRowCells = within(rowElements[2]).getAllByRole("cell");
  const thirdDataRowCells = within(rowElements[3]).getAllByRole("cell");
  const strColRowOneCell = firstDataRowCells[0];
  const strColRowTwoCell = secondDataRowCells[0];
  const strColRowThreeCell = thirdDataRowCells[0];

  expect(strColRowOneCell).toHaveTextContent("a");
  expect(strColRowTwoCell).toHaveTextContent("c");
  expect(strColRowThreeCell).toHaveTextContent("b");
});

it("Sorts number columns by value rather than lexicographically", () => {
  render(
    <SortTestHarness
      cols={cols}
      rows={rows}
      initialSortDef={{ name: "numCol", order: "asc" }}
    />,
  );

  screen.getByRole("columnheader", {
    name: "Number Column (sorted ascending)",
  });
  const rowElements = screen.getAllByRole("row");
  const firstDataRowCells = within(rowElements[1]).getAllByRole("cell");
  const secondDataRowCells = within(rowElements[2]).getAllByRole("cell");
  const thirdDataRowCells = within(rowElements[3]).getAllByRole("cell");
  const numColRowOneCell = firstDataRowCells[1];
  const numColRowTwoCell = secondDataRowCells[1];
  const numColRowThreeCell = thirdDataRowCells[1];

  expect(numColRowOneCell).toHaveTextContent("1");
  expect(numColRowTwoCell).toHaveTextContent("2");
  expect(numColRowThreeCell).toHaveTextContent("10");
});

it("Sorts date columns by value rather than formatted string", () => {
  render(
    <SortTestHarness
      cols={cols}
      rows={rows}
      initialSortDef={{ name: "dateCol", order: "asc" }}
    />,
  );

  screen.getByRole("columnheader", {
    name: "Date Column (sorted ascending)",
  });
  const rowElements = screen.getAllByRole("row");
  const firstDataRowCells = within(rowElements[1]).getAllByRole("cell");
  const secondDataRowCells = within(rowElements[2]).getAllByRole("cell");
  const thirdDataRowCells = within(rowElements[3]).getAllByRole("cell");
  const dateColRowOneCell = firstDataRowCells[2];
  const dateColRowTwoCell = secondDataRowCells[2];
  const dateColRowThreeCell = thirdDataRowCells[2];

  expect(dateColRowOneCell).toHaveTextContent("1");
  expect(dateColRowTwoCell).toHaveTextContent("2");
  expect(dateColRowThreeCell).toHaveTextContent("10");
});

it("Sorts datetime columns by value rather than formatted string", () => {
  render(
    <SortTestHarness
      cols={cols}
      rows={rows}
      initialSortDef={{ name: "datetimeCol", order: "asc" }}
    />,
  );

  screen.getByRole("columnheader", {
    name: "Datetime Column (sorted ascending)",
  });
  const rowElements = screen.getAllByRole("row");
  const firstDataRowCells = within(rowElements[1]).getAllByRole("cell");
  const secondDataRowCells = within(rowElements[2]).getAllByRole("cell");
  const thirdDataRowCells = within(rowElements[3]).getAllByRole("cell");
  const datetimeColRowOneCell = firstDataRowCells[3];
  const datetimeColRowTwoCell = secondDataRowCells[3];
  const datetimeColRowThreeCell = thirdDataRowCells[3];

  expect(datetimeColRowOneCell).toHaveTextContent("1");
  expect(datetimeColRowTwoCell).toHaveTextContent("2");
  expect(datetimeColRowThreeCell).toHaveTextContent("10");
});
