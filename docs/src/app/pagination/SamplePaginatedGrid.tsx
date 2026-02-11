"use client";

import Grid, {
  ColDef,
  GridPaginationState,
  RowDef,
} from "@absreim/react-bootstrap-data-grid";
import { FC, useState } from "react";

const cols: ColDef[] = [
  {
    type: "string",
    name: "name",
    label: "Name",
  },
  {
    type: "number",
    name: "class",
    label: "Armor Class",
  },
  {
    type: "string",
    name: "weight",
    label: "Weight",
  },
];

const rows: RowDef[] = [
  {
    name: "Leather Armor",
    class: 11,
    weight: "Light",
  },
  {
    name: "Padded Armor",
    class: 11,
    weight: "Light",
  },
  {
    name: "Studded Leather Armor",
    class: 12,
    weight: "Light",
  },
  {
    name: "Hide Armor",
    class: 12,
    weight: "Medium",
  },
  {
    name: "Chain Shirt",
    class: 13,
    weight: "Medium",
  },
  {
    name: "Scale Mail",
    class: 14,
    weight: "Medium",
  },
  {
    name: "Breastplate",
    class: 14,
    weight: "Medium",
  },
  {
    name: "Half Plate",
    class: 15,
    weight: "Medium",
  },
  {
    name: "Ring Mail",
    class: 14,
    weight: "Heavy",
  },
  {
    name: "Chain Mail",
    class: 16,
    weight: "Heavy",
  },
  {
    name: "Splint Armor",
    class: 17,
    weight: "Heavy",
  },
  {
    name: "Plate Armor",
    class: 18,
    weight: "Heavy",
  },
];

const SamplePaginatedGrid: FC = () => {
  const [pageSizeIndex, setPageSizeIndex] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  const paginationState: GridPaginationState = {
    pageSizeOptions: [5, 10, 15],
    pageSizeIndex: pageSizeIndex,
    setPageSizeIndex: (pageSizeIndex) => setPageSizeIndex(pageSizeIndex),
    currentPage: pageNum,
    setCurrentPage: (pageNum) => setPageNum(pageNum),
    maxPageButtons: 5,
    componentSize: "large",
  };

  return <Grid rows={rows} cols={cols} pagination={paginationState} />;
};

export default SamplePaginatedGrid;
