import { ReactNode, useMemo, useState } from "react";
import {
  GridHeightSetting,
  GridSpecificProps,
  GridWidthSetting,
} from "../../grid";
import { GridDimSetting } from "./types";
import Form from "react-bootstrap/esm/Form";

export interface UseDimSettingHookOutput {
  heightFieldset: ReactNode;
  widthFieldset: ReactNode;
  effectiveHeight: GridSpecificProps["height"];
  effectiveWidth: GridSpecificProps["width"];
}

const gridDimSettings: GridDimSetting[] = ["unset", "number", "auto", "parent"];

const useDimSetting: (
  fixedHeight: number,
  fixedWidth: number,
) => UseDimSettingHookOutput = (fixedHeight, fixedWidth) => {
  const [heightSetting, setHeightSetting] = useState<GridDimSetting>("unset");
  const [widthSetting, setWidthSetting] = useState<GridDimSetting>("unset");

  const effectiveWidth: GridWidthSetting | undefined = useMemo(() => {
    switch (widthSetting) {
      case "unset":
        return undefined;
      case "number":
        return 400;
      default:
        return widthSetting;
    }
  }, [widthSetting]);
  const effectiveHeight: GridHeightSetting | undefined = useMemo(() => {
    switch (heightSetting) {
      case "unset":
        return undefined;
      case "number":
        return 300;
      default:
        return heightSetting;
    }
  }, [heightSetting]);
  const heightFieldset = (
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
  );
  const widthFieldset = (
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
  );

  return {
    heightFieldset,
    widthFieldset,
    effectiveHeight,
    effectiveWidth,
  };
};

export default useDimSetting;
