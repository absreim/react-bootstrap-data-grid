"use client";

import {
  cols,
  generateBasicTestRows,
} from "../../../test-tools/basic-test-data";
import { FC, ReactNode, useState } from "react";
import Grid from "../../../grid";
import Form from "react-bootstrap/Form";

type BooleanOptionName = "true" | "false" | "unset";
type BooleanOptions = Record<
  BooleanOptionName,
  { label: string; value: boolean | undefined }
>;
type GapOptions = Record<string, { label: string; value: number | undefined }>;
type AlignSettingString = "left" | "center" | "right";
type AlignOptions = Record<
  AlignSettingString | "unset",
  { label: string; value: AlignSettingString | undefined }
>;

const testRows = generateBasicTestRows(25);

const booleanOptions: BooleanOptions = {
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
const booleanOptNameToLabel = Object.keys(booleanOptions).reduce((prev, curr) => {
  prev[curr] = booleanOptions[curr as BooleanOptionName].label;
  return prev;
}, {} as Record<string, string>);

const gapOptions: GapOptions = [0, 1, 2, 3, 4, 5].reduce(
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
const gapOptNameToLabel = Object.keys(gapOptions).reduce(
  (prev, curr) => {
    prev[curr] = gapOptions[curr].label;
    return prev
  },
  {} as Record<string, string>,
);

const alignOptions: AlignOptions = {
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
const alignOptNameToLabel = Object.keys(alignOptions).reduce(
  (prev, curr) => {
    prev[curr] = alignOptions[curr as AlignSettingString | "unset"].label;
    return prev;
  },
  {} as Record<string, string>,
);

function getRadioGroup(
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

const TestHarness: FC = () => {
  const [aboveMain, setAboveMain] = useState<string>("unset");
  const [sizeAfterPageNum, setSizeAfterPageNum] =
    useState<string>("unset");
  const [horizAlign, setHorizAlign] = useState<string>(
    "unset",
  );
  const [mainSpacing, setMainSpacing] = useState<string>("unset");
  const [pageSpacing, setPageSpacing] = useState<string>("unset");

  return (
    <>
      <Form>
        {getRadioGroup(
          "Pagination UI Above Grid",
          booleanOptNameToLabel,
          aboveMain,
          setAboveMain,
          "aboveGridSetting",
        )}
        {getRadioGroup(
          "Page Size Select after Page Num Select",
          booleanOptNameToLabel,
          sizeAfterPageNum,
          setSizeAfterPageNum,
          "afterPageSizeSetting",
        )}
        {getRadioGroup(
          "Pagination Component Alignment",
          alignOptNameToLabel,
          horizAlign,
          setHorizAlign,
          "horizAlignSetting",
        )}
        {getRadioGroup(
          "Main Component Spacing",
          gapOptNameToLabel,
          mainSpacing,
          setMainSpacing,
          "mainSpacingSetting",
        )}
        {getRadioGroup(
          "Pagination Component Spacing",
          gapOptNameToLabel,
          pageSpacing,
          setPageSpacing,
          "pageSpacingSetting",
        )}
      </Form>
      <Grid
        rows={testRows}
        cols={cols}
        pagination={{
          type: "uncontrolled",
          pageSizeOptions: [5, 10],
          styleOptions: {
            aboveMainComponent:
              booleanOptions[aboveMain as BooleanOptionName].value,
            sizeSelectAfterPageSelect:
              booleanOptions[sizeAfterPageNum as BooleanOptionName].value,
            horizontalAlignment:
              alignOptions[horizAlign as AlignSettingString | "unset"].value,
            mainComponentSpacing: gapOptions[mainSpacing].value,
            paginationComponentSpacing: gapOptions[pageSpacing].value,
          },
        }}
      />
    </>
  );
};

export default TestHarness;
