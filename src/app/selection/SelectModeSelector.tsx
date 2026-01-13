import Form from "react-bootstrap/Form";
import { ChangeEventHandler, FC } from "react";
import { SelectMode } from "@/grid";

export interface SelectModeSelectorProps {
  mode: SelectMode;
  setMode: (mode: SelectMode) => void;
  radioGroupName: string;
}

const SelectModeSelector: FC<SelectModeSelectorProps> = ({
  mode,
  setMode,
  radioGroupName,
}) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMode(event.target.value as SelectMode);
  }

  return (
    <Form>
      <fieldset>
        <legend>Choose Selection Mode</legend>
        {["column", "row", "both"].map((inputMode) => (
          <Form.Check
            key={inputMode}
            type="radio"
            value={inputMode}
            label={inputMode}
            name={radioGroupName}
            checked={inputMode === mode}
            onChange={onChange}
          />
        ))}
      </fieldset>
    </Form>
  );
};

export default SelectModeSelector;
