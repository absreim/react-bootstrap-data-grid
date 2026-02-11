"use client";

import { FC } from "react";
import { ColDef, RowDef } from "@/grid";
import PaginationFeatureTestHarness, {
  PaginationFeatureTestHarnessProps,
} from "@/app/pagination/test/feature/PaginationFeatureTestHarness";

const cols: ColDef[] = [
  {
    type: "number",
    name: "numCol",
    label: "Number Column",
    formatter: (value: number) => String(value),
  },
];

const rows: RowDef[] = Array(15)
  .keys()
  .toArray()
  .map((key) => ({
    numCol: String(key + 1),
  }));

const harnessProps: PaginationFeatureTestHarnessProps = {
  rows,
  cols,
  pageSizeOptions: [5, 10, 15],
  initialPageSizeIndex: 0,
  initialPage: 1,
  maxPageButtons: 5,
};

const edgeButtonTestHarnessProps: PaginationFeatureTestHarnessProps = {
  rows,
  cols,
  pageSizeOptions: [3],
  initialPageSizeIndex: 0,
  initialPage: 1,
  maxPageButtons: 3,
};

const Test: FC = () => {
  return (
    <>
      <div data-testid="15-row test container">
        <PaginationFeatureTestHarness {...harnessProps} />
      </div>
      <div data-testid="edge button test container">
        <PaginationFeatureTestHarness {...edgeButtonTestHarnessProps} />
      </div>
    </>
  );
};

export default Test;
