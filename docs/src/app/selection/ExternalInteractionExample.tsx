"use client";

import { FC, useMemo, useState } from "react";
import Grid, {
  ColDef,
  MultiSelectModel,
  RowDef,
} from "@absreim/react-bootstrap-data-grid";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const cols: ColDef[] = [
  {
    type: "number",
    name: "number",
    label: "Number",
  },
];

const origRows: RowDef[] = [
  {
    number: 1,
  },
  {
    number: 2,
  },
  {
    number: 3,
  },
  {
    number: 4,
  },
  {
    number: 5,
  },
];

const ExternalInteractionExample: FC = () => {
  const [rows, setRows] = useState<RowDef[]>(origRows);
  const [selected, setSelected] = useState<number[]>([]);
  const selectModel: MultiSelectModel = useMemo(
    () => ({
      mode: "both",
      type: "multi",
      selected,
      setSelected,
    }),
    [selected],
  );

  const deleteSelectedRows = () => {
    setRows(rows.filter((_, index) => !selected.includes(index)));
    setSelected([]);
  };

  const resetRows = () => {
    setRows(origRows.slice());
  };

  return (
    <Stack gap={2}>
      <Grid rows={rows} cols={cols} selectModel={selectModel} />
      <Stack direction="horizontal" gap={2} className="justify-content-end">
        <Button
          onClick={resetRows}
          disabled={rows.length === origRows.length}
          variant="secondary"
        >
          Reset
        </Button>
        <Button
          onClick={deleteSelectedRows}
          disabled={selected.length === 0}
          variant="primary"
        >
          Delete Selected
        </Button>
      </Stack>
    </Stack>
  );
};

export default ExternalInteractionExample;
