import { FC, useEffect, useRef } from "react";
import { SelectHeaderCellProps } from "./internalTypes";

const SelectHeaderCell: FC<SelectHeaderCellProps> = ({
  handleSelectAll,
  selectionState,
  noRows,
  className,
  tabIndex,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.indeterminate = selectionState === "partial";
  }, [selectionState]);

  return (
    <div role="columnheader" className={className} tabIndex={tabIndex}>
      <input
        className="form-check-input"
        type="checkbox"
        ref={inputRef}
        onChange={handleSelectAll}
        checked={selectionState !== "none"}
        disabled={noRows}
      />
    </div>
  );
};

export default SelectHeaderCell;
