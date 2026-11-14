import {
  AlignOptions,
  AlignSettingString,
  BooleanOptionName,
  BooleanOptions,
  GapOptions,
} from "./types";
import { ReactNode } from "react";
import Form from "react-bootstrap/esm/Form";

export const booleanOptions: BooleanOptions = {
  unset: {
    label: "Unset (same as false)",
    value: undefined,
  },
  false: {
    label: "False",
    value: false,
  },
  true: {
    label: "True",
    value: true,
  },
};

export const booleanOptNameToLabel = Object.keys(booleanOptions).reduce(
  (prev, curr) => {
    prev[curr] = booleanOptions[curr as BooleanOptionName].label;
    return prev;
  },
  {} as Record<string, string>,
);

export const gapOptions: GapOptions = [0, 1, 2, 3, 4, 5].reduce(
  (prev, curr) => {
    prev[String(curr)] = {
      label: String(curr),
      value: curr,
    };
    return prev;
  },
  {
    unset: {
      label: "Unset (same as 2)",
      value: undefined,
    },
  } as GapOptions,
);

export const gapOptNameToLabel = Object.keys(gapOptions).reduce(
  (prev, curr) => {
    prev[curr] = gapOptions[curr].label;
    return prev;
  },
  {} as Record<string, string>,
);

export const alignOptions: AlignOptions = {
  unset: {
    label: "Unset (same as right)",
    value: undefined,
  },
  left: {
    label: "Left",
    value: "left",
  },
  center: {
    label: "Center",
    value: "center",
  },
  right: {
    label: "Right",
    value: "right",
  },
};

export const alignOptNameToLabel = Object.keys(alignOptions).reduce(
  (prev, curr) => {
    prev[curr] = alignOptions[curr as AlignSettingString | "unset"].label;
    return prev;
  },
  {} as Record<string, string>,
);

export const sizeOptionToLabel: Record<string, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

export function getRadioGroup(
  legend: string,
  optionLabels: Record<string, string>,
  currentVal: string,
  setVal: (val: string) => void,
  settingTypeId: string,
): ReactNode {
  return (
    <fieldset key={settingTypeId}>
      <legend>{legend}</legend>
      {Object.keys(optionLabels).map((optionName) => {
        return (
          <Form.Check
            key={optionName}
            type="radio"
            id={`${settingTypeId}-${optionName}`}
            label={optionLabels[optionName]}
            checked={currentVal === optionName}
            value={optionName}
            onChange={({ target }) => setVal(target.value as BooleanOptionName)}
          />
        );
      })}
    </fieldset>
  );
}
