"use client";

import { FC, useState } from "react";
import Grid, {
  GridBorderSetting,
  GridStripeSetting,
  GridWidthSetting,
} from "@/grid";
import Form from "react-bootstrap/Form";
import { cols, generateBasicTestRows } from "@/test-tools/basic-test-data";

type GridDimSetting = "unset" | "number" | "auto" | "parent";
type TestGridStripeSetting = GridStripeSetting | "unset";
type TestGridBorderSetting = GridBorderSetting | "unset";

const testRows = generateBasicTestRows(10);

const stripeSettings: TestGridStripeSetting[] = [
  "unset",
  "rows",
  "columns",
  "none",
];
const borderSettings: TestGridBorderSetting[] = [
  "unset",
  "full",
  "horizontal",
  "none",
];
const variants = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "light",
  "bsbrand",
];

const gridDimSettings: GridDimSetting[] = ["unset", "number", "auto", "parent"];

// This test harness does not test active rows or cells. Such testing should be
// done as part of testing of a feature that uses active rows and/or cells.

const TestHarness: FC = () => {
  const [heightSetting, setHeightSetting] = useState<GridDimSetting>("unset");
  const [widthSetting, setWidthSetting] = useState<GridDimSetting>("unset");
  const [stripes, setStripes] = useState<TestGridStripeSetting>("unset");
  const [hover, setHover] = useState<boolean>(false);
  const [divider, setDivider] = useState<boolean>(false);
  const [borders, setBorders] = useState<TestGridBorderSetting>("unset");
  const [small, setSmall] = useState<boolean>(false);
  const [variant, setVariant] = useState<string>("");
  const [borderVariant, setBorderVariant] = useState<string>("");

  const getEffectiveWidth: () => GridWidthSetting | undefined = () => {
    switch (widthSetting) {
      case "unset":
        return undefined;
      case "number":
        return 400;
      default:
        return widthSetting;
    }
  };

  const getEffectiveHeight: () => GridWidthSetting | undefined = () => {
    switch (heightSetting) {
      case "unset":
        return undefined;
      case "number":
        return 300;
      default:
        return heightSetting;
    }
  };

  return (
    <>
      <Form>
        <fieldset>
          <legend>Height Setting</legend>
          {gridDimSettings.map((setting) => (
            <Form.Check
              key={setting}
              type="radio"
              id={`heightSetting-${setting}`}
              label={setting}
              checked={heightSetting === setting}
              value={setting}
              onChange={({ target }) =>
                setHeightSetting(target.value as GridDimSetting)
              }
            />
          ))}
        </fieldset>
        <fieldset>
          <legend>Width Setting</legend>
          {gridDimSettings.map((setting) => (
            <Form.Check
              key={setting}
              type="radio"
              id={`widthSetting-${setting}`}
              label={setting}
              checked={widthSetting === setting}
              value={setting}
              onChange={({ target }) =>
                setWidthSetting(target.value as GridDimSetting)
              }
            />
          ))}
        </fieldset>
        <fieldset>
          <legend>Stripe Setting</legend>
          {stripeSettings.map((setting) => (
            <Form.Check
              key={setting}
              type="radio"
              id={`stripeSetting-${setting}`}
              label={setting}
              checked={stripes === setting}
              value={setting}
              onChange={({ target }) =>
                setStripes(target.value as TestGridStripeSetting)
              }
            />
          ))}
        </fieldset>
        <fieldset>
          <legend>Border Setting</legend>
          {borderSettings.map((setting) => (
            <Form.Check
              key={setting}
              type="radio"
              id={`borderSetting-${setting}`}
              label={setting}
              checked={borders === setting}
              value={setting}
              onChange={({ target }) =>
                setBorders(target.value as GridBorderSetting)
              }
            />
          ))}
        </fieldset>
        <Form.Check
          type="switch"
          id="hoverToggle"
          label="Hover Styles"
          checked={hover}
          onChange={({ target }) => setHover(target.checked)}
        />
        <Form.Check
          type="switch"
          id="dividerToggle"
          label="Body Divider"
          checked={divider}
          onChange={({ target }) => setDivider(target.checked)}
        />
        <Form.Check
          type="switch"
          id="smallToggle"
          label="Dense Grid"
          checked={small}
          onChange={({ target }) => setSmall(target.checked)}
        />
        {["", "border"].map((optionType) => {
          const id = `${optionType}-variantSelect`;
          const stateVar = optionType === "" ? variant : borderVariant;
          const setStateFn = optionType === "" ? setVariant : setBorderVariant;

          return (
            <div key={optionType}>
              <label htmlFor={id}>
                Select {optionType && optionType + " "}variant
              </label>
              <Form.Select
                id={id}
                value={stateVar}
                onChange={({ target }) => setStateFn(target.value)}
              >
                <option value="">(None)</option>
                {variants.map((variant) => (
                  <option key={variant} value={variant}>
                    {variant}
                  </option>
                ))}
              </Form.Select>
            </div>
          );
        })}
      </Form>
      <div style={{ height: 500, width: 700 }}>
        <Grid
          rows={testRows}
          cols={cols}
          width={getEffectiveWidth()}
          height={getEffectiveHeight()}
          stripes={stripes === "unset" ? undefined : stripes}
          hover={hover}
          divider={divider}
          borders={borders === "unset" ? undefined : borders}
          small={small}
          variant={variant || undefined}
          borderVariant={borderVariant || undefined}
        />
      </div>
    </>
  );
};

export default TestHarness;
