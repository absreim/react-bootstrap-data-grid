import { FC } from "react";

import SingleSelectionTestHarness from "@/app/selection/single/SingleSelectionTestHarness";
import { cols, rows } from "@/app/selection/test-info";

const TestDivs: FC<{ pro?: boolean }> = ({ pro }) => (
  <>
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
        pro={pro}
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
        pro={pro}
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
        pro={pro}
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
        pro={pro}
      />
    </div>
  </>
);

export default TestDivs;
