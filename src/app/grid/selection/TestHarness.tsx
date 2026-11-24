"use client";

import {
  cols,
  generateBasicTestRows,
} from "../../../test-tools/basic-test-data";
import { FC, useState } from "react";
import Grid, { RowId, SelectMode, SelectModel } from "../../../grid";
import Form from "react-bootstrap/Form";
import { getRadioGroup } from "../../../test-tools/interface-options";

const testRows = generateBasicTestRows(25);

const selectModeOptions: Record<string, string> = {
  row: "Row",
  column: "Column",
  both: "Both",
};

const TestHarness: FC = () => {
  const [allowMultiSelect, setAllowMultiSelect] = useState(false);
  const [singleSelectedRow, setSingleSelectedRow] = useState<RowId | null>(
    null,
  );
  const [multiSelectedRows, setMultiSelectedRows] = useState<RowId[]>([]);
  const [selectMode, setSelectMode] = useState("both");

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
        cols={cols}
        selectModel={selectModel}
        pagination={{
          type: "uncontrolled",
          pageSizeOptions: [5, 10],
        }}
      />
    </>
  );
};

export default TestHarness;
