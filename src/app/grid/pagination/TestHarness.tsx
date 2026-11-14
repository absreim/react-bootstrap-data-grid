"use client";

import {
  cols,
  generateBasicTestRows,
} from "../../../test-tools/basic-test-data";
import { FC, useState } from "react";
import Grid, { Size } from "../../../grid";
import Form from "react-bootstrap/Form";
import useDimSetting from "../useDimSetting";
import {
  AlignSettingString,
  BooleanOptionName,
} from "../../../test-tools/types";
import {
  alignOptions,
  alignOptNameToLabel,
  booleanOptions,
  booleanOptNameToLabel,
  gapOptions,
  gapOptNameToLabel,
  getRadioGroup,
  sizeOptionToLabel,
} from "../../../test-tools/interface-options";

const testRows = generateBasicTestRows(25);

const TestHarness: FC = () => {
  const [aboveMain, setAboveMain] = useState<string>("unset");
  const [sizeAfterPageNum, setSizeAfterPageNum] = useState<string>("unset");
  const [horizAlign, setHorizAlign] = useState<string>("unset");
  const [mainSpacing, setMainSpacing] = useState<string>("unset");
  const [pageSpacing, setPageSpacing] = useState<string>("unset");
  const [size, setSize] = useState<string>("medium");
  const [showTextLabel, setShowTextLabel] = useState<string>("unset");

  const { heightFieldset, widthFieldset, effectiveHeight, effectiveWidth } =
    useDimSetting(300, 400);

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
        {getRadioGroup(
          "Pagination Component Size",
          sizeOptionToLabel,
          size,
          setSize,
          "sizeSetting",
        )}
        {getRadioGroup(
          "Show Text Label",
          booleanOptNameToLabel,
          showTextLabel,
          setShowTextLabel,
          "showTextLabelSetting",
        )}
        {heightFieldset}
        {widthFieldset}
      </Form>
      <div style={{ height: 500, width: 700 }}>
        <Grid
          rows={testRows}
          cols={cols}
          width={effectiveWidth}
          height={effectiveHeight}
          pagination={{
            type: "uncontrolled",
            pageSizeOptions: [5, 10],
            componentSize: size as Size,
            showTextLabel:
              booleanOptions[showTextLabel as BooleanOptionName].value,
            pageSelectorAriaLabel: "Grid page selection",
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
      </div>
    </>
  );
};

export default TestHarness;
