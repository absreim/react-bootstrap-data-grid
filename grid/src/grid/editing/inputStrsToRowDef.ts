import { ColDef, RowDef } from "../types";

const inputStrsToRowDef: (cols: ColDef[], inputStrs: string[]) => RowDef = (
  cols,
  inputStrs,
) => {
  const newRow: RowDef = {};
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

export default inputStrsToRowDef;
