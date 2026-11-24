import { HTMLAttributes } from "react";
import { CheckboxState } from "../../common/selection/internalTypes";

export type SelectBodyCellProps = {
  handleSelect?: () => void;
  isSelected: boolean;
  selectType: "single" | "multi";
  radioGroup: string;
} & Pick<HTMLAttributes<HTMLDivElement>, "className" | "tabIndex">;

export type SelectHeaderCellProps = {
  handleSelectAll: () => void;
  checkboxState: CheckboxState;
} & Pick<HTMLAttributes<HTMLDivElement>, "className" | "tabIndex">;
