import { ColDef, GridProps } from "../grid";

export type ProColDef<ValueType = any> = ColDef<ValueType> & {
  resizeable?: boolean;
}

export type GridProProps = Omit<GridProps, "cols"> & {
  cols: ProColDef[];
}
