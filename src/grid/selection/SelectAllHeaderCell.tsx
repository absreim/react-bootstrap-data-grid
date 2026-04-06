"use client";

import { CSSProperties, FC, useEffect, useRef } from "react";
import classNames from "classnames";
import { SelectionInfo } from "./types";

interface SelectAllHeaderCellProps {
  onClick: () => void;
  selectionInfo: SelectionInfo;
  totalRows: number;
  additionalClasses?: string[];
  style?: CSSProperties;
}

interface CheckboxState {
  indeterminate: boolean;
  checked: boolean;
  disabled: boolean;
  description: string;
}

const getCheckboxState: (
  selectionInfo: SelectionInfo,
  noRows: boolean,
) => CheckboxState = (selectionInfo, noRows) => {
  const disabledState: CheckboxState = {
    indeterminate: false,
    checked: false,
    disabled: true,
    description: "Select all (disabled)",
  };

  if (noRows) {
    return disabledState;
  }

  const { existingSelection } = selectionInfo;

  if (existingSelection === "full") {
    return {
      indeterminate: false,
      checked: true,
      disabled: false,
      description: "Deselect all rows",
    };
  }

  if (existingSelection === true || existingSelection === "partial") {
    return {
      indeterminate: true,
      checked: true,
      disabled: false,
      description: "Deselect all rows",
    };
  }

  if (existingSelection === "none") {
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
  selectionInfo,
  totalRows,
  additionalClasses,
  style
}) => {
  const noRows = totalRows === 0;
  const { indeterminate, checked, disabled, description } = getCheckboxState(
    selectionInfo,
    noRows,
  );
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current!.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <th
      style={style}
      aria-colindex={1}
      title={description}
      aria-description={description}
      className={classNames(
        {
          "btn-primary": !additionalClasses || additionalClasses.length === 0,
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
