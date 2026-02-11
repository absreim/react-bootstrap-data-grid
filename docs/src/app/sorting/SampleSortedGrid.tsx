"use client";

import Grid, {
  ColDef,
  RowDef,
  SortColDef,
  TableSortModel,
} from "@absreim/react-bootstrap-data-grid";
import { FC, useState } from "react";

const cols: ColDef[] = [
  {
    name: "name",
    type: "string",
    label: "Name",
    sortable: true,
  },
  {
    name: "damage",
    type: "number",
    label: "Average Damage",
    sortable: true,
  },
  {
    name: "dmgType",
    type: "string",
    label: "Damage Type",
  },
  {
    name: "weight",
    type: "number",
    label: "Weight (lb)",
    sortable: true,
  },
  {
    name: "price",
    type: "number",
    label: "Price",
    sortable: true,
  },
];

const rows: RowDef[] = [
  {
    name: "Flail",
    damage: 4.5,
    dmgType: "Bludgeoning",
    weight: 2,
    price: 50,
  },
  {
    name: "Morningstar",
    damage: 4.5,
    dmgType: "Piercing",
    weight: 3.6,
    price: 50,
  },
  {
    name: "Rapier",
    damage: 4.5,
    dmgType: "Piercing",
    weight: 1.8,
    price: 80,
  },
  {
    name: "Scimitar",
    damage: 4.5,
    dmgType: "Slashing",
    weight: 2.7,
    price: 30,
  },
  {
    name: "War Pick",
    damage: 4.5,
    dmgType: "Piercing",
    weight: 1.8,
    price: 40,
  },
  {
    name: "Battleaxe",
    damage: 5.5,
    dmgType: "Slashing",
    weight: 3.6,
    price: 50,
  },
  {
    name: "Longsword",
    damage: 5.5,
    dmgType: "Slashing",
    weight: 2.7,
    price: 40,
  },
  {
    name: "Warhammer",
    damage: 5.5,
    dmgType: "Bludgeoning",
    weight: 5.4,
    price: 50,
  },
  {
    name: "Greataxe",
    damage: 6.5,
    dmgType: "Slashing",
    weight: 6.3,
    price: 65,
  },
  {
    name: "Greatsword",
    damage: 7,
    dmgType: "Slashing",
    weight: 5.4,
    price: 65,
  },
  {
    name: "Maul",
    damage: 7,
    dmgType: "Bludgeoning",
    weight: 9,
    price: 40,
  },
];

const SampleSortedGrid: FC = () => {
  const [sortColDef, setSortColDef] = useState<SortColDef | null>({
    name: "name",
    order: "asc",
  });

  const tableSortModel: TableSortModel = {
    sortColDef,
    setSortColDef,
  };

  return <Grid rows={rows} cols={cols} sortModel={tableSortModel} />;
};

export default SampleSortedGrid;
