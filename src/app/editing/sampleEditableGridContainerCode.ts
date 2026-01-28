const code = `
"use client";

import Grid, { ColDef, UpdateCallbackGenerator, RowDef } from "@/grid";
import { FC, useState } from "react";

const cols: ColDef[] = [
  {
    name: "name",
    type: "string",
    label: "Name",
  },
  {
    name: "class",
    type: "string",
    label: "Class",
  },
  {
    name: "selectionPriority",
    type: "number",
    label: "Selection Priority",
  },
  {
    name: "recruitmentDate",
    type: "date",
    label: "Recruitment Date",
  },
];

const initRows: RowDef[] = [
  {
    name: "Astarion",
    class: "Rogue",
    selectionPriority: 1,
    recruitmentDate: new Date("2023-10-02"),
  },
  {
    name: "Lae'zel",
    class: "Fighter",
    selectionPriority: 4,
    recruitmentDate: new Date("2023-09-30"),
  },
  {
    name: "Shadowheart",
    class: "Cleric",
    selectionPriority: 2,
    recruitmentDate: new Date("2023-10-01"),
  },
  {
    name: "Dark Urge",
    class: "Sorcerer",
    selectionPriority: 5,
    recruitmentDate: new Date("2023-09-29"),
  },
  {
    name: "Gale",
    class: "Wizard",
    selectionPriority: 3,
    recruitmentDate: new Date("2023-10-03"),
  },
  {
    name: "Wyll",
    class: "Warlock",
    selectionPriority: 5,
    recruitmentDate: new Date("2023-10-04"),
  },
  {
    name: "Karlach",
    class: "Barbarian",
    selectionPriority: 4,
    recruitmentDate: new Date("2023-10-05"),
  },
  {
    name: "Minthara",
    class: "Paladin",
    selectionPriority: 5,
    recruitmentDate: new Date("2023-10-06"),
  },
  {
    name: "Halsin",
    class: "Druid",
    selectionPriority: 4,
    recruitmentDate: new Date("2023-10-07"),
  },
  {
    name: "Jaheira",
    class: "Druid",
    selectionPriority: 4,
    recruitmentDate: new Date("2023-10-08"),
  },
  {
    name: "Minsc",
    class: "Ranger",
    selectionPriority: 2,
    recruitmentDate: new Date("2023-10-09"),
  },
];

const SampleEditableGridContainer: FC = () => {
  const [rows, setRows] = useState<RowDef[]>(initRows.slice());
  const getUpdateCallback: UpdateCallbackGenerator =
    (origIndex) => (rowDef) => {
      const newRows = rows.slice();
      newRows[origIndex] = rowDef;
      setRows(newRows);
    };
  const getDeleteCallback: (origIndex: number) => () => void =
    (origIndex) => () => {
      if (window.confirm("Are you sure you want to delete this row?")) {
        setRows(rows.toSpliced(origIndex, 1));
      }
    };

  return (
    <Grid
      rows={rows}
      cols={cols}
      editModel={{ getUpdateCallback, getDeleteCallback }}
      caption={"Plan out your party for your BG3 adventure"}
    />
  );
};

export default SampleEditableGridContainer;
`;

export default code;
