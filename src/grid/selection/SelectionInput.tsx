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
}

const SelectionInput: FC<SelectionInputProps> = ({
  selectionInputModel,
  selected,
  selectCallback,
  additionalClasses
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
      className={classNames(additionalClasses || [])}
      aria-label="Input to select the current row"
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
