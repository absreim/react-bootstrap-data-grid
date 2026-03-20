"use client";

import Grid, {
  EditableTableFilterState,
  FilterModel,
  StyleModel,
} from "@/grid";
import { FC, useMemo, useState } from "react";
import { cols, rows } from "@/app/styling/multitype-test-data";

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
    form: ["table-responsive"],
  },
  toolbarStyleModel: {
    activeButton: ["active-button-test-class"],
    inactiveButton: ["inactive-button-test-class"],
    toolbar: ["toolbar-test-class"],
    interfaceContainer: ["interface-container-test-class"],
  },
};

const FilterStylingTestHarness: FC = () => {
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
    () => ({
      tableFilterState,
      setTableFilterState,
      filterTableCaption: "filter table test caption",
    }),
    [tableFilterState],
  );

  return (
    <Grid
      rows={rows}
      cols={cols}
      filterModel={filterModel}
      caption="main table test caption"
      styleModel={styleModel}
    />
  );
};

export default FilterStylingTestHarness;
