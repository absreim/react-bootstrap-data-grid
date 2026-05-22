import { FC } from "react";
import MultiSelectionTestHarness from "@/app/selection/multi/MultiSelectionTestHarness";
import { cols, rows } from "@/app/selection/test-info";

const TestDivs: FC<{ pro?: boolean }> = ({ pro }) => (
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
        pro={pro}
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
        pro={pro}
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
        pro={pro}
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
        pro={pro}
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
        pro={pro}
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
        pro={pro}
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
        pro={pro}
      />
    </div>
  </>
);

export default TestDivs;
