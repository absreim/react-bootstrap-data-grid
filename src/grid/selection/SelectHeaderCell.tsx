import { FC, useEffect, useRef } from "react";
import { SelectHeaderCellProps } from "./internalTypes";

const SelectHeaderCell: FC<SelectHeaderCellProps> = ({
  handleSelectAll,
  checkboxState: {
    indeterminate,
    checked,
    disabled,
    description,
  },
  className,
  tabIndex,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div role="columnheader" className={className} tabIndex={tabIndex}>
      <input
        className="form-check-input"
        type="checkbox"
        ref={inputRef}
        onChange={handleSelectAll}
        checked={checked}
        disabled={disabled}
        aria-label={description}
        title={description}
      />
    </div>
  );
};

export default SelectHeaderCell;
