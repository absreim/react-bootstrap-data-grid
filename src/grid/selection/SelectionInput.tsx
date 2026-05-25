import { ChangeEventHandler, FC } from "react";
import classNames from "classnames";

export interface RadioSelectionInputModel {
  type: "radio";

  // needed to group radio buttons together
  // there should be one distinct name per grid
  name: string;
}

export interface CheckboxSelectionInputModel {
  type: "checkbox";
  deselectCallback: () => void;
  name?: string;
}

export type SelectionInputModel =
  | RadioSelectionInputModel
  | CheckboxSelectionInputModel;

export interface SelectionInputProps {
  selected: boolean;
  selectionInputModel: SelectionInputModel;
  selectCallback: () => void;
  additionalClasses?: string[];
  index: number;
}

const SelectionInput: FC<SelectionInputProps> = ({
  selectionInputModel,
  selected,
  selectCallback,
  additionalClasses,
  index,
}) => {
  const type = selectionInputModel.type;

  const onChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { checked },
  }) => {
    // theoretically, a radio button shouldn't become unchecked so the below
    // check of the "type" variable is not needed except for narrowing the
    // type of the "selectionInputModel"
    if (!checked && type === "checkbox") {
      selectionInputModel.deselectCallback();
      return;
    }

    if (checked) {
      selectCallback();
    }
  };

  return (
    <input
      tabIndex={0}
      className={classNames(additionalClasses || [])}
      aria-label={`Select row with index ${index}`}
      onClick={(event) => {
        event.stopPropagation();
      }}
      type={type}
      checked={selected}
      onChange={onChange}
      name={selectionInputModel.name}
    />
  );
};

export default SelectionInput;
