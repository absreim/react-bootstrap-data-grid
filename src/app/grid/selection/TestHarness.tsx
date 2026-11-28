"use client";

import {
  cols,
  generateBasicTestRows,
} from "../../../test-tools/basic-test-data";
import { FC, useMemo, useState } from "react";
import Grid, {
  BodyRowVariantFn,
  RowId,
  SelectMode,
  SelectModel,
  SortModel,
} from "../../../grid";
import Form from "react-bootstrap/Form";
import { getRadioGroup } from "../../../test-tools/interface-options";

const testRows = generateBasicTestRows(25);

const selectModeOptions: Record<string, string> = {
  row: "Row",
  column: "Column",
  both: "Both",
};

const headerSelectionCellVariant = "success";
const headerSelectionCellFocusVariant = "warning";
const bodySelectionCellVariant: BodyRowVariantFn = (row, displayIndex) => {
  if ((row.contents[0].value as string).includes("1st")) {
    return "danger";
  }

  if (displayIndex % 2 === 0) {
    return "success";
  }

  return null;
}
const bodySelectionCellFocusVariant: BodyRowVariantFn = (row, displayIndex) => {
  if ((row.contents[0].value as string).includes("1st")) {
    return "warning";
  }

  if (displayIndex % 2 === 0) {
    return "secondary";
  }

  return null;
};

const TestHarness: FC = () => {
  const [allowMultiSelect, setAllowMultiSelect] = useState(false);
  const [sortable, setSortable] = useState(false);
  const [singleSelectedRow, setSingleSelectedRow] = useState<RowId | null>(
    null,
  );
  const [multiSelectedRows, setMultiSelectedRows] = useState<RowId[]>([]);
  const [selectMode, setSelectMode] = useState("both");

  const modifiedCols = useMemo(() => {
    if (!sortable) {
      return cols;
    }

    return cols.map((col) => ({
      ...col,
      sortable: col.name === "strCol" || col.name === "date",
    }));
  }, [sortable])
  const sortModel: SortModel | undefined = useMemo(() => {
    if (!sortable) {
      return undefined;
    }

    return { type: "uncontrolled", initialSortColDef: null }
  }, [sortable])

  const selectModel: SelectModel = allowMultiSelect
    ? {
        mode: selectMode as SelectMode,
        type: "multi",
        selected: multiSelectedRows,
        setSelected: setMultiSelectedRows,
      }
    : {
        mode: selectMode as SelectMode,
        type: "single",
        selected: singleSelectedRow,
        setSelected: setSingleSelectedRow,
      };

  return (
    <>
      <Form>
        <Form.Check
          type="switch"
          id="allowMultiToggle"
          label="Allow Multi Select"
          checked={allowMultiSelect}
          onChange={({ target }) => setAllowMultiSelect(target.checked)}
        />
        <Form.Check
          type="switch"
          id="sortableToggle"
          label="Allow Sorting"
          checked={sortable}
          onChange={({ target }) => setSortable(target.checked)}
        />
        {getRadioGroup(
          "Selection Mode",
          selectModeOptions,
          selectMode,
          setSelectMode,
          "setSelectMode",
        )}
      </Form>
      <Grid
        rows={testRows}
        cols={modifiedCols}
        selectModel={selectModel}
        pagination={{
          type: "uncontrolled",
          pageSizeOptions: [5, 10],
        }}
        sortModel={sortModel}
        variant="info"
        bodySelectionCellVariant={bodySelectionCellVariant}
        bodySelectionCellFocusVariant={bodySelectionCellFocusVariant}
        headerSelectionCellVariant={headerSelectionCellVariant}
        headerSelectionCellFocusVariant={headerSelectionCellFocusVariant}
      />
    </>
  );
};

export default TestHarness;
