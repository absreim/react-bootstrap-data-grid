"use client";

import { CSSProperties, FC, useEffect, useRef } from "react";
import classNames from "classnames";
import { SelectionInfo } from "../../common/selection/internalTypes";
import getSelectionCheckboxState from "../../common/selection/getSelectionCheckboxState";

interface SelectAllHeaderCellProps {
  onClick: () => void;
  selectionInfo: SelectionInfo;
  totalRows: number;
  customClasses?: string[];
  style?: CSSProperties;
  colIndexOffset?: number;
}

const SelectAllHeaderCell: FC<SelectAllHeaderCellProps> = ({
  onClick,
  selectionInfo,
  totalRows,
  customClasses,
  style,
  colIndexOffset,
}) => {
  const noRows = totalRows === 0;
  const { indeterminate, checked, disabled, description } =
    getSelectionCheckboxState(selectionInfo, noRows);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current!.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <th
      style={style}
      aria-colindex={1 + (colIndexOffset || 0)}
      title={description}
      aria-description={description}
      className={classNames(customClasses || "btn-primary")}
    >
      <input
        className="form-check-input"
        tabIndex={0}
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
