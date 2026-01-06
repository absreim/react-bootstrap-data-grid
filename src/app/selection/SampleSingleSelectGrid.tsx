"use client";

import { FC, useState } from "react";
import Grid, { ColDef, RowDef, SingleSelectModel } from "@/grid";

const cols: ColDef[] = [
  {
    name: "name",
    type: "string",
    label: "Name",
  },
  {
    name: "school",
    type: "string",
    label: "School",
  },
];

const rows: RowDef[] = [
  {
    name: "Acid Splash",
    school: "Conjuration",
  },
  {
    name: "Blade Ward",
    school: "Abjuration",
  },
  {
    name: "Bone Chill",
    school: "Necromancy",
  },
  {
    name: "Fire Bolt",
    school: "Evocation",
  },
  {
    name: "Minor Illusion",
    school: "Illusion",
  },
  {
    name: "Friends",
    school: "Enchantment",
  },
  {
    name: "Ray of Frost",
    school: "Evocation",
  },
];

const SampleSingleSelectGrid: FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const selectModel: SingleSelectModel = {
    mode: "column",
    type: "single",
    selected,
    setSelected,
    groupName: "single selection example grid (BG3 cantrips)"
  };

  return <Grid rows={rows} cols={cols} selectModel={selectModel} />;
};

export default SampleSingleSelectGrid;
