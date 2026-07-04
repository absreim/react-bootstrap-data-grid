"use client";

import { FC, useState } from "react";
import Grid, { GridBorderSetting, GridStripeSetting } from "@/grid";
import Form from "react-bootstrap/Form";
import { cols, generateBasicTestRows } from "@/test-tools/basic-test-data";

const testRows = generateBasicTestRows(10);

const stripeSettings: GridStripeSetting[] = ["rows", "columns", "none"];
const borderSettings: GridBorderSetting[] = ["full", "horizontal", "none"];
const variants = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "light",
];

const TestHarness: FC = () => {
  const [stripes, setStripes] = useState<GridStripeSetting>("rows");
  const [hover, setHover] = useState<boolean>(true);
  const [divider, setDivider] = useState<boolean>(true);
  const [borders, setBorders] = useState<GridBorderSetting>("full");
  const [small, setSmall] = useState<boolean>(true);
  const [variant, setVariant] = useState<string>("");
  const [borderVariant, setBorderVariant] = useState<string>("");

  return (
    <>
      <Form>
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
                setStripes(target.value as GridStripeSetting)
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
      <Grid
        rows={testRows}
        cols={cols}
        width={400}
        height={300}
        stripes={stripes}
        hover={hover}
        divider={divider}
        borders={borders}
        small={small}
        variant={variant || undefined}
        borderVariant={borderVariant || undefined}
      />
    </>
  );
};

export default TestHarness;
