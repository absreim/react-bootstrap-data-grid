"use client";

import { cols, generateBasicTestRows } from "../../../test-tools/basic-test-data";
import { FC, useState } from "react";
import Grid, { RowId, SelectModel } from "../../../grid";
import Form from "react-bootstrap/Form";

const testRows = generateBasicTestRows(25);

const TestHarness: FC = () => {
  const [allowMultiSelect, setAllowMultiSelect] = useState(false);
  const [singleSelectedRow, setSingleSelectedRow] = useState<RowId | null>(null);
  const [multiSelectedRows, setMultiSelectedRows] = useState<RowId[]>([]);

  const selectModel: SelectModel = allowMultiSelect ? {
    mode: "row",
    type: "multi",
    selected: multiSelectedRows,
    setSelected: setMultiSelectedRows,
  } : {
    mode: "row",
    type: "single",
    selected: singleSelectedRow,
    setSelected: setSingleSelectedRow,
  }

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
}

export default TestHarness;
