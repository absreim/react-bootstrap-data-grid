"use client";

import Grid, { ColDef, MultiSelectModel, RowDef } from "@/grid";
import { FC, useMemo, useState } from "react";

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

const SampleMultiSelectGrid: FC = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const selectModel: MultiSelectModel = {
    mode: "column",
    type: "multi",
    selected,
    setSelected,
  };

  return <Grid rows={rows} cols={cols} selectModel={selectModel} />;
};

export default SampleMultiSelectGrid;
