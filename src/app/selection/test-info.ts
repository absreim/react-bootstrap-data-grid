import { ColDef, RowDef } from "@/table";

export const cols: ColDef[] = [
  {
    type: "number",
    name: "rowNumber",
    label: "Row Number",
  },
  {
    type: "string",
    name: "rowDescription",
    label: "Row Description",
  },
];

export const rows: RowDef[] = [
  {
    id: 0,
    data: {
      rowNumber: 1,
      rowDescription: "First row",
    },
  },
  {
    id: 1,
    data: {
      rowNumber: 2,
      rowDescription: "Second row",
    },
  },
  {
    id: 2,
    data: {
      rowNumber: 3,
      rowDescription: "Third row",
    },
  },
  {
    id: 3,
    data: {
      rowNumber: 4,
      rowDescription: "Fourth row",
    },
  },
  {
    id: 4,
    data: {
      rowNumber: 5,
      rowDescription: "Fifth row",
    },
  },
];
