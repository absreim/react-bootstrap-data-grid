"use client";

import { StyleModel } from "@/grid";
import { FC } from "react";
import FilterStylingTestHarness from "@/app/styling/filtering/FilterStylingTestHarness";

const completeStyleModel: StyleModel = {
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

const nullStyleModel: StyleModel = {
  filterInputTableStyleModel: {
    theadTh: () => null,
    tbodyTr: () => null,
    tbodyTd: () => null,
    enablementInput: () => null,
    schemeSelectionInput: () => null,
    searchStringInput: () => null,
    numberInput: () => null,
    startDateInput: () => null,
    endDateInput: () => null,
  }
};

const TestContents: FC<{ pro?: boolean }> = ({ pro }) => (
  <>
    <div data-testid="complete style model container">
      <FilterStylingTestHarness pro={pro} styleModel={completeStyleModel} />
    </div>
    <div data-testid="null style model container">
      <FilterStylingTestHarness pro={pro} styleModel={nullStyleModel} />
    </div>
  </>
);

export default TestContents;
