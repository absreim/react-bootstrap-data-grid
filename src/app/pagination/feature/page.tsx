"use client";

import { FC, Fragment } from "react";
import { ColDef, RowDef } from "@/grid";
import PaginationFeatureTestHarness, {
  PaginationFeatureTestHarnessProps,
} from "@/app/pagination/feature/PaginationFeatureTestHarness";

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
  .map((key, index) => ({
    id: index,
    data: {
      numCol: String(key + 1),
    },
  }));

interface TestParams {
  testId: string;
  props: Omit<PaginationFeatureTestHarnessProps, "controlled">;
}

const testParamsList: TestParams[] = [
  {
    testId: "15-row test container",
    props: {
      rows,
      cols,
      pageSizeOptions: [5, 10, 15],
      initialPageSizeIndex: 0,
      initialPage: 1,
      maxPageButtons: 5,
    },
  },
  {
    testId: "edge button test container",
    props: {
      rows,
      cols,
      pageSizeOptions: [3],
      initialPageSizeIndex: 0,
      initialPage: 1,
      maxPageButtons: 3,
    },
  },
];

const Test: FC = () => {
  return (
    <>
      {testParamsList.map(({ testId, props }) => (
        <Fragment key={testId}>
          <div data-testid={`${testId}-controlled`}>
            <PaginationFeatureTestHarness {...{ ...props, controlled: true }} />
          </div>
          <div data-testid={`${testId}-uncontrolled`}>
            <PaginationFeatureTestHarness {...{ ...props, controlled: false }} />
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default Test;
