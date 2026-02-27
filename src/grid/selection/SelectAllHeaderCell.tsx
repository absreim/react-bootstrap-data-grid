"use client"

import { FC, useEffect, useRef } from "react";
import classNames from "classnames";
import { SelectType } from "./types";

interface SelectAllHeaderCellProps {
  onClick: () => void;
  selectType: SelectType;
  selectionExists: boolean;
  totalRows: number;
  additionalClasses?: string[];
}

interface CheckboxState {
  indeterminate: boolean;
  checked: boolean;
  disabled: boolean;
  description: string;
}

// An ideal state for this component would be to display the checkbox
// differently when there is a full selection. That state is not implemented for
// this iteration of the component. For now, the behavior is that the checkbox
// goes into an indeterminate state for any existing selection, full or not.
//
// An additional challenge when it comes to implementing such a feature would be
// to implement logic to validate that selections are still appropriate in
// response to changes in the source data. For example: some selected indices
// may no longer exist in the new version of the source data.
const getCheckboxState: (
  selectMode: SelectType,
  existingSelection: boolean,
  noRows: boolean,
) => CheckboxState = (selectMode, existingSelection, noRows) => {
  const disabledState: CheckboxState = {
    indeterminate: false,
    checked: false,
    disabled: true,
    description: "Select all (disabled)",
  };

  if (noRows) {
    return disabledState;
  }

  if (existingSelection) {
    return {
      indeterminate: true,
      checked: true,
      disabled: false,
      description: "Deselect all rows",
    };
  }

  if (selectMode === "multi" && !existingSelection) {
    return {
      indeterminate: false,
      checked: false,
      disabled: false,
      description: "Select all rows",
    };
  }

  // single select mode and none selected
  return disabledState;
};

const SelectAllHeaderCell: FC<SelectAllHeaderCellProps> = ({
  onClick,
  selectType,
  selectionExists,
  totalRows,
  additionalClasses,
}) => {
  const noRows = totalRows === 0;
  const { indeterminate, checked, disabled, description } = getCheckboxState(
    selectType,
    selectionExists,
    noRows,
  );
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current!.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <th
      aria-colindex={1}
      title={description}
      aria-description={description}
      className={classNames(
        "rbdg-select-header-cell",
        {
          "btn-primary": !additionalClasses || additionalClasses.length === 0,
          "rbdg-clickable-grid-header-cell": !disabled,
        },
        additionalClasses || [],
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        ref={ref}
        disabled={disabled}
        aria-label={description}
        onChange={onClick}
      />
    </th>
  );
};

export default SelectAllHeaderCell;
