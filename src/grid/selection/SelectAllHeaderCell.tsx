import { SelectType } from "../types";
import { FC, ReactNode } from "react";
import deselectAll from "../icons/deselectAll";
import selectAll from "../icons/selectAll";
import arrowPlaceholder from "../icons/arrowPlaceholder";
import classNames from "classnames";

interface SelectAllHeaderCellProps {
  onClick: () => void;
  selectType: SelectType;
  selectionExists: boolean;
}

const getSelectIcon: (
  selectMode: SelectType,
  existingSelection: boolean,
) => ReactNode = (selectMode, existingSelection) => {
  if (existingSelection) {
    return deselectAll;
  }

  if (selectMode === "multi" && !existingSelection) {
    return selectAll;
  }

  // Single select mode and none selected means that the button is disabled
  return arrowPlaceholder;
};

const getCellAriaDescription: (
  selectMode: SelectType,
  existingSelection: boolean,
) => string = (selectMode, existingSelection) => {
  if (existingSelection) {
    return "Deselect all rows";
  }

  if (selectMode === "multi" && !existingSelection) {
    return "Select all rows";
  }

  // Single select mode and none selected means that the button is disabled
  return "Selection input header cell";
};

const SelectAllHeaderCell: FC<SelectAllHeaderCellProps> = ({
  onClick,
  selectType,
  selectionExists,
}) => {
  const disabled = selectType === "single" && !selectionExists;

  const description = getCellAriaDescription(selectType, selectionExists);

  return (
    <th
      aria-colindex={1}
      title={description}
      aria-description={description}
      className={classNames("select-header-cell", "btn-primary", {
        "cursor-pointer": !disabled,
      })}
      onClick={onClick}
    >
      {getSelectIcon(selectType, selectionExists)}
    </th>
  );
};

export default SelectAllHeaderCell;
