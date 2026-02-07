"use client";

import Grid, {
  ColDef,
  EditableTableFilterState,
  FilterModel,
  RowDef,
  StyleModel,
} from "@/grid";
import { FC, useMemo, useState } from "react";
import { dateToDatetimeInputStr, dateToInputStr } from "@/grid/util/datetime";

const cols: ColDef[] = [
  {
    name: "strCol",
    type: "string",
    label: "String Column",
  },
  {
    name: "numCol",
    type: "number",
    label: "Number Column",
  },
  {
    name: "dateCol",
    type: "date",
    label: "Date Column",
    formatter: dateToInputStr,
  },
  {
    name: "datetimeCol",
    type: "date",
    label: "Datetime Column",
    formatter: dateToDatetimeInputStr,
  },
];

const rows: RowDef[] = [
  {
    strCol: "First Row",
    numCol: 1,
    dateCol: new Date("2026-01-01"),
    datetimeCol: new Date("2026-01-01T01:00"),
  },
  {
    strCol: "Second Row",
    numCol: 2,
    dateCol: new Date("2026-01-02"),
    datetimeCol: new Date("2026-01-02T02:00"),
  },
  {
    strCol: "Third Row",
    numCol: 3,
    dateCol: new Date("2026-01-03"),
    datetimeCol: new Date("2026-01-03T03:00"),
  },
  {
    strCol: "Fourth Row",
    numCol: 4,
    dateCol: new Date("2026-01-04"),
    datetimeCol: new Date("2026-01-04T04:00"),
  },
  {
    strCol: "Fifth Row",
    numCol: 5,
    dateCol: new Date("2026-01-05"),
    datetimeCol: new Date("2026-01-05T05:00"),
  },
];

const styleModel: StyleModel = {
  additionalComponentsStyleModel: {
    filterInputsDiv: ["filter-inputs-div-test-class"],
    filterUiToggleButton: ["filter-ui-toggle-button-test-class"],
  },
  filterInputTableStyleModel: {
    table: ["filter-input-table-test-class"],
    tbody: ["filter-input-table-body-test-class"],
    thead: ["filter-input-table-thead-test-class"],
    theadTr: ["filter-input-table-thead-tr-test-class"],
    theadTh: (colIndex) => [
      `filter-input-table-thead-th-test-class-col-${colIndex}}`,
    ],
    caption: ["filter-input-table-caption-test-class"],
    tbodyTr: (rowIndex) => [
      `filter-input-table-tbody-tr-test-class-row-${rowIndex}`,
    ],
    tbodyTd: (rowIndex, colIndex) => [
      `filter-input-table-tbody-td-test-class-row-${rowIndex}`,
      `filter-input-table-tbody-td-test-class-col-${colIndex}`,
    ],
    enablementInput: (rowIndex) => [
      `enablement-input-test-class-row-${rowIndex}`,
    ],
    schemeSelectionInput: (rowIndex) => [
      `scheme-selection-input-test-class-row-${rowIndex}`,
    ],
    searchStringInput: (rowIndex) => [
      `search-string-input-test-class-row-${rowIndex}`,
    ],
    numberInput: (rowIndex) => [`number-input-test-class-row-${rowIndex}`],
    startDateInput: (rowIndex) => [
      `start-date-input-test-class-row-${rowIndex}`,
    ],
    endDateInput: (rowIndex) => [`end-date-input-test-class-row-${rowIndex}`],
    submitButton: ["submit-button-test-class"],
  },
};

const FilterOptionsStylingTestHarness: FC = () => {
  const [tableFilterState, setTableFilterState] =
    useState<EditableTableFilterState>({
      strCol: {
        type: "string",
        scheme: "startsWith",
        searchString: "",
        enabled: false,
      },
      numCol: {
        type: "number",
        scheme: "greaterOrEqual",
        numValue: 2,
        enabled: true,
      },
      dateCol: {
        type: "date",
        scheme: "between",
        startDate: null,
        endDate: null,
        enabled: false,
      },
      datetimeCol: {
        type: "datetime",
        scheme: "endAt",
        endDate: null,
        enabled: false,
      },
    });
  const filterModel: FilterModel = useMemo(
    () => ({ tableFilterState, setTableFilterState }),
    [tableFilterState],
  );

  return (
    <Grid
      rows={rows}
      cols={cols}
      filterModel={filterModel}
      caption="test caption"
      styleModel={styleModel}
    />
  );
};

export default FilterOptionsStylingTestHarness;
