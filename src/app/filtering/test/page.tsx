"use client";

import { FC } from "react";
import { ColDef, EditableTableFilterState, RowDef } from "@/grid";
import FilteringTestHarness from "@/app/filtering/test/FilteringTestHarness";

const numTestCols: ColDef[] = [
  {
    type: "number",
    name: "numCol",
    label: "Number Column",
    formatter: (value: number) => String(value),
  },
];

const numTestRows: RowDef[] = [
  {
    numCol: -1,
  },
  {
    numCol: 0,
  },
  {
    numCol: 0.99999,
  },
  {
    numCol: 1,
  },
  {
    numCol: 1.00001,
  },
];

const lessThanFilterState: EditableTableFilterState = {
  numCol: {
    enabled: true,
    type: "number",
    scheme: "lessThan",
    numValue: 1,
  },
};

const Test: FC = () => {
  return (
    <>
      <div data-testid="number less than grid container">
        <FilteringTestHarness
          cols={numTestCols}
          rows={numTestRows}
          initialFilterState={lessThanFilterState}
        />
      </div>
    </>
  );
};

export default Test;
