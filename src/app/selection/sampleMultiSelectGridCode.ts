const code = `
"use client";

import Grid, { ColDef, MultiSelectModel, RowDef, SelectMode } from "@/grid";
import { FC, useMemo, useState } from "react";

export interface SampleMultiSelectGridProps {
  mode: SelectMode;
}

const cols: ColDef[] = [
  {
    name: "name",
    type: "string",
    label: "Name",
  },
  {
    name: "damage",
    type: "number",
    label: "Average Damage",
  },
  {
    name: "weight",
    type: "number",
    label: "Weight (lb)",
  },
  {
    name: "price",
    type: "number",
    label: "Price",
  },
];

const rows: RowDef[] = [
  {
    name: "Short Bow",
    damage: 3.5,
    weight: 1.8,
    price: 16,
  },
  {
    name: "Long Bow",
    damage: 4.5,
    weight: 2.2,
    price: 50,
  },
  {
    name: "Light Crossbow",
    damage: 4.5,
    weight: 4.5,
    price: 30,
  },
  {
    name: "Heavy Crossbow",
    damage: 5.5,
    weight: 16.2,
    price: 65,
  },
  {
    name: "Hand Crossbow",
    damage: 3.5,
    weight: 1.8,
    price: 50,
  },
];

const SampleMultiSelectGrid: FC<SampleMultiSelectGridProps> = ({ mode }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const selectModel: MultiSelectModel = useMemo(() => ({
    mode,
    type: "multi",
    selected,
    setSelected,
  }), [mode, selected]);

  return <Grid rows={rows} cols={cols} selectModel={selectModel} />;
};

export default SampleMultiSelectGrid;
`;

export default code;
