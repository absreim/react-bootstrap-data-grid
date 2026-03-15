"use client";

import { FC, useMemo } from "react";
import Grid, {
  ColDef,
  EditableTableFilterState,
  ExportFormStyleModel,
  RowDef,
} from "@/grid";

export interface ExportTestHarnessProps {
  enableFiltering: boolean;
  enablePaginaton: boolean;
  enableFormatters: boolean;
  enableStyles: boolean;
}

const combinedTestCols: ColDef[] = [
  {
    type: "string",
    name: "strCol",
    label: "String Column",
    formatter: (s: string) => s.length.toString(),
  },
  {
    type: "number",
    name: "numCol",
    label: "Number Column",
    formatter: (n: number) => (n === 0 ? "zero" : "non-zero"),
  },
  {
    type: "date",
    name: "dateCol",
    label: "Date Column",
    formatter: (d: Date) => d.valueOf().toString(),
  },
  {
    type: "datetime",
    name: "datetimeCol",
    label: "Datetime Column",
    formatter: (d: Date) => d.valueOf().toString(),
  },
];

interface CombinedTestRow {
  strCol: string;
  numCol: number;
  dateCol: Date;
  datetimeCol: Date;
}

const combinedTestRows: RowDef<CombinedTestRow>[] = [
  {
    id: 0,
    data: {
      strCol: "bc",
      numCol: 2,
      dateCol: new Date("2022-01-01"),
      datetimeCol: new Date("2022-01-01T01:01"),
    },
  },
  {
    id: 1,
    data: {
      strCol: "adef",
      numCol: 0,
      dateCol: new Date("2023-02-02"),
      datetimeCol: new Date("2023-02-02T02:02"),
    },
  },
  {
    id: 2,
    data: {
      strCol: "aghi",
      numCol: 3,
      dateCol: new Date("2025-04-04"),
      datetimeCol: new Date("2024-03-03T03:03"),
    },
  },
  {
    id: 3,
    data: {
      strCol: "ajkl",
      numCol: 4,
      dateCol: new Date("2024-03-03"),
      datetimeCol: new Date("2025-04-04T04:04"),
    },
  },
];

const combinedFilterState: EditableTableFilterState = {
  strCol: {
    enabled: false,
    type: "string",
    scheme: "contains",
    searchString: "a",
  },
  numCol: {
    enabled: false,
    type: "number",
    scheme: "greaterOrEqual",
    numValue: 2,
  },
  dateCol: {
    enabled: false,
    type: "date",
    scheme: "endAt",
    endDate: new Date("2025-01-01"),
  },
  datetimeCol: {
    enabled: true,
    type: "datetime",
    scheme: "endAt",
    endDate: new Date("2025-01-01T00:00"),
  },
};

const styleModel: ExportFormStyleModel = {
  legend: ["legend-test-class"],
  radioContainer: ["radio-container-test-class"],
  radioInput: ["radio-input-test-class"],
  radioLabel: ["radio-label-test-class"],
  submitButton: ["submit-button-test-class"],
}

const ExportTestHarness: FC<ExportTestHarnessProps> = ({
  enableFiltering,
  enablePaginaton,
  enableFormatters,
  enableStyles,
}) => {
  const cols = useMemo(
    () =>
      enableFormatters
        ? combinedTestCols
        : combinedTestCols.map((col) => ({
            ...col,
            formatter: undefined,
          })),
    [enableFormatters],
  );

  return (
    <Grid
      rows={combinedTestRows}
      cols={cols}
      filterModel={
        enableFiltering
          ? {
              type: "uncontrolled",
              tableFilterState: combinedFilterState,
            }
          : undefined
      }
      pagination={
        enablePaginaton
          ? {
              type: "uncontrolled",
              pageSizeOptions: [2],
              startingPageSizeIndex: 0,
            }
          : undefined
      }
      styleModel={enableStyles ? {
        exportFormStyleModel: styleModel
      } : undefined}
      useToolbar={true}
    />
  );
};

export default ExportTestHarness;
