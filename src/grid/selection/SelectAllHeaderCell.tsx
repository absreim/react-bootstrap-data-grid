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
  additionalClasses?: string[];
}

// It seems like React does not support setting indeterminate states on
// checkboxes in a controlled manner, which caused me to not want to refactor
// this feature to use a checkbox input instead of SVG icons. I am not sure how
// much of an issue using an uncontrolled input would be, but because at time of
// this writing I had already implemented a solution with SVG, on balance I felt
// like it was not worth going out of my way to change things up to use an
// uncontrolled checkbox input.
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
  additionalClasses,
}) => {
  const disabled = selectType === "single" && !selectionExists;

  const description = getCellAriaDescription(selectType, selectionExists);

  return (
    <th
      aria-colindex={1}
      title={description}
      aria-description={description}
      className={classNames(
        "rbdg-select-header-cell",
        "btn-primary",
        {
          "rbdg-clickable-grid-header-cell": !disabled,
        },
        additionalClasses || [],
      )}
      onClick={onClick}
    >
      {getSelectIcon(selectType, selectionExists)}
    </th>
  );
};

export default SelectAllHeaderCell;
