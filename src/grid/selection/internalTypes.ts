import { HTMLAttributes } from "react";

export type SelectBodyCellProps = {
  handleSelect: () => void;
  isSelected: boolean;
  selectMode: "single" | "multi";
  radioGroup: string;
} & Pick<HTMLAttributes<HTMLDivElement>, "className" | "tabIndex">;

export type SelectionTotality = "none" | "partial" | "full";

export type SelectHeaderCellProps = {
  handleSelectAll: () => void;
  selectionState: SelectionTotality;
  noRows: boolean;
} & Pick<HTMLAttributes<HTMLDivElement>, "className" | "tabIndex">;
