import { ColDefBase, RowData } from "../types";

const inputStrsToRowData: (
  cols: ColDefBase[],
  inputStrs: string[],
) => RowData = (cols, inputStrs) => {
  const newRow: RowData = {};
  inputStrs.forEach((value, index) => {
    const col = cols[index];
    switch (col.type) {
      case "string":
        newRow[col.name] = value;
        return;
      case "number":
        newRow[col.name] = Number(value);
        return;
      default:
        newRow[col.name] = new Date(value);
    }
  });
  return newRow;
};

export default inputStrsToRowData;
