"use client";

import { FC, useMemo, useState } from "react";
import Grid, { ColDef, RowDef, SelectMode, SingleSelectModel } from "@/grid";

export interface SampleSingleSelectGridProps {
  mode: SelectMode;
}

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

const SampleSingleSelectGrid: FC<SampleSingleSelectGridProps> = ({ mode }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const selectModel: SingleSelectModel = useMemo(
    () => ({
      mode,
      type: "single",
      selected,
      setSelected,
      groupName: "single selection example grid (BG3 cantrips)",
    }),
    [mode, selected],
  );

  return <Grid rows={rows} cols={cols} selectModel={selectModel} />;
};

export default SampleSingleSelectGrid;
