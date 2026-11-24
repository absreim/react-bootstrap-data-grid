import { FC, KeyboardEventHandler } from "react";
import { SelectBodyCellProps } from "./internalTypes";

const SelectBodyCell: FC<SelectBodyCellProps> = ({
  selectType,
  isSelected,
  handleSelect,
  className,
  tabIndex,
  radioGroup,
}) => {
  const onKeyDown: KeyboardEventHandler<HTMLDivElement> | undefined =
    handleSelect === undefined
      ? undefined
      : (event) => {
          switch (event.code) {
            case "Space": {
              handleSelect();
              break;
            }
            default:
              return;
          }
        };

  return (
    <div
      role="gridcell"
      className={className}
      tabIndex={tabIndex}
      onClick={handleSelect}
      onKeyDown={onKeyDown}
      aria-colindex={1}
    >
      <input
        tabIndex={-1}
        className="form-check-input"
        type={selectType === "multi" ? "checkbox" : "radio"}
        checked={isSelected}
        radioGroup={radioGroup}
        readOnly
      />
    </div>
  );
};

export default SelectBodyCell;
