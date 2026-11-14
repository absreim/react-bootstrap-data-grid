"use client";

import {
  cols,
  generateBasicTestRows,
} from "../../../test-tools/basic-test-data";
import { FC, useState } from "react";
import Form from "react-bootstrap/Form";
import {
  gapOptions,
  gapOptNameToLabel,
  getRadioGroup,
} from "../../../test-tools/interface-options";
import Grid from "../../../grid";

const testRows = generateBasicTestRows(25);

const TestHarness: FC = () => {
  const [mainSpacing, setMainSpacing] = useState<string>("unset");

  return (
    <>
      <Form>
        {getRadioGroup(
          "Main Component Spacing",
          gapOptNameToLabel,
          mainSpacing,
          setMainSpacing,
          "mainSpacingSetting",
        )}
      </Form>
      <div style={{ height: 500, width: 700 }}>
        <Grid
          rows={testRows}
          cols={cols}
          styleOptions={{ mainComponentSpacing: gapOptions[mainSpacing].value }}
          pagination={{ type: "uncontrolled" }}
          allowExport
          filterModel={{ type: "uncontrolled" }}
        />
      </div>
    </>
  );
};

export default TestHarness;
