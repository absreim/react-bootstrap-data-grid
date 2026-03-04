"use client";

import { FC } from "react";
import { ColDef, RowDef } from "@/grid";
import MultiSelectionTestHarness from "@/app/selection/MultiSelectionTestHarness";
import SingleSelectionTestHarness from "@/app/selection/SingleSelectionTestHarness";

const cols: ColDef[] = [
  {
    type: "number",
    name: "rowNumber",
    label: "Row Number",
  },
  {
    type: "string",
    name: "rowDescription",
    label: "Row Description",
  },
];

const rows: RowDef[] = [
  {
    id: 0,
    data: {
      rowNumber: 1,
      rowDescription: "First row",
    },
  },
  {
    id: 1,
    data: {
      rowNumber: 2,
      rowDescription: "Second row",
    },
  },
  {
    id: 2,
    data: {
      rowNumber: 3,
      rowDescription: "Third row",
    },
  },
  {
    id: 3,
    data: {
      rowNumber: 4,
      rowDescription: "Fourth row",
    },
  },
  {
    id: 4,
    data: {
      rowNumber: 5,
      rowDescription: "Fifth row",
    },
  },
];

const Test: FC = () => {
  return (
    <>
      <div data-testid="multi select column mode initial selections test container">
        <MultiSelectionTestHarness
          rows={rows}
          cols={cols}
          initialState={{
            mode: "column",
            type: "multi",
            selected: [1, 2],
          }}
        />
      </div>
      <div data-testid="multi select column mode no initial selections test container">
        <MultiSelectionTestHarness
          rows={rows}
          cols={cols}
          initialState={{
            mode: "column",
            type: "multi",
            selected: [],
          }}
        />
      </div>
      <div data-testid="multi select row mode initial selections test container">
        <MultiSelectionTestHarness
          rows={rows}
          cols={cols}
          initialState={{
            mode: "row",
            type: "multi",
            selected: [1, 2],
          }}
        />
      </div>
      <div data-testid="multi select row mode no initial selections test container">
        <MultiSelectionTestHarness
          rows={rows}
          cols={cols}
          initialState={{
            mode: "row",
            type: "multi",
            selected: [],
          }}
        />
      </div>
      <div data-testid="multi select both mode initial selections test container">
        <MultiSelectionTestHarness
          rows={rows}
          cols={cols}
          initialState={{
            mode: "both",
            type: "multi",
            selected: [1, 2],
          }}
        />
      </div>
      <div data-testid="single select column mode initial selections test container">
        <SingleSelectionTestHarness
          rows={rows}
          cols={cols}
          initialState={{
            mode: "column",
            type: "single",
            selected: 1,
            groupName: "single-col-selected",
          }}
        />
      </div>
      <div data-testid="single select column mode no initial selections test container">
        <SingleSelectionTestHarness
          rows={rows}
          cols={cols}
          initialState={{
            mode: "column",
            type: "single",
            selected: null,
            groupName: "single-col-none-selected",
          }}
        />
      </div>
      <div data-testid="single select row mode initial selections test container">
        <SingleSelectionTestHarness
          rows={rows}
          cols={cols}
          initialState={{
            mode: "row",
            type: "single",
            selected: 1,
            groupName: "single-row-selected",
          }}
        />
      </div>
      <div data-testid="single select both mode no initial selections test container">
        <SingleSelectionTestHarness
          rows={rows}
          cols={cols}
          initialState={{
            mode: "both",
            type: "single",
            selected: null,
            groupName: "single-row-selected",
          }}
        />
      </div>
      <div data-testid="multi select no rows test container">
        <MultiSelectionTestHarness
          rows={[]}
          cols={cols}
          initialState={{
            mode: "column",
            type: "multi",
            selected: [],
          }}
          filterModel={{
            tableFilterState: {
              rowNumber: {
                type: "number",
                scheme: "equals",
                numValue: 0,
                enabled: true,
              },
              rowDescription: {
                type: "string",
                scheme: "contains",
                searchString: "",
                enabled: false,
              },
            },
            setTableFilterState: () => {},
          }}
        />
      </div>
      <div data-testid="full selection test container">
        <MultiSelectionTestHarness
          rows={rows}
          cols={cols}
          initialState={{
            mode: "column",
            type: "multi",
            selected: [0, 1, 2, 3, 4, 5],
          }}
        />
      </div>
    </>
  );
};

export default Test;
