"use client";

import { FC } from "react";
import { ColDef, RowDef } from "@/grid";
import MultiSelectionTestHarness from "@/app/selection/test/MultiSelectionTestHarness";

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
    rowNumber: 1,
    rowDescription: "First row",
  },
  {
    rowNumber: 2,
    rowDescription: "Second row",
  },
  {
    rowNumber: 3,
    rowDescription: "Third row",
  },
  {
    rowNumber: 4,
    rowDescription: "Fourth row",
  },
  {
    rowNumber: 5,
    rowDescription: "Fifth row",
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
    </>
  );
};

export default Test;
