import { FC, KeyboardEventHandler, useEffect, useRef } from "react";
import { SelectHeaderCellProps } from "./internalTypes";

const SelectHeaderCell: FC<SelectHeaderCellProps> = ({
  handleSelectAll,
  checkboxState: { indeterminate, checked, disabled, description },
  className,
  tabIndex,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.indeterminate = indeterminate;
  }, [indeterminate]);

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.code) {
      case "Space": {
        handleSelectAll();
        break;
      }
      default:
        return;
    }
  };

  return (
    <div
      role="columnheader"
      className={className}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      onClick={handleSelectAll}
      aria-colindex={1}
    >
      <input
        tabIndex={-1}
        className="form-check-input"
        type="checkbox"
        ref={inputRef}
        checked={checked}
        disabled={disabled}
        aria-label={description}
        title={description}
        readOnly
      />
    </div>
  );
};

export default SelectHeaderCell;
