import {
  AdditionalComponentsStyleModel,
  StyleModel,
  TableStyleModel,
} from "../styling/types";
import { useMemo } from "react";
import {
  unwrapAdditionalComponentsStyleModel,
  unwrapTableStyleModel,
} from "../styling/styleModelUnwrappers";

export interface UseUnwrappedGridStylesHook {
  unwrappedTableModel: Required<TableStyleModel>;
  unwrappedAdditionalStyleModel: Required<AdditionalComponentsStyleModel>;
}

const UseUnwrappedGridStyles: (
  styleModel: StyleModel | undefined,
) => UseUnwrappedGridStylesHook = (styleModel) => {
  // To give the developer the ability to specify between removing existing styles
  // and simply adding additional ones, we should migrate off of this "unwrapped"
  // design over time and instead apply logic based on the original params that
  // can be undefined.
  const unwrappedTableModel: Required<TableStyleModel> = useMemo(
    () => unwrapTableStyleModel(styleModel?.mainTableStyleModel),
    [styleModel?.mainTableStyleModel],
  );

  const unwrappedAdditionalStyleModel: Required<AdditionalComponentsStyleModel> =
    useMemo(
      () =>
        unwrapAdditionalComponentsStyleModel(
          styleModel?.additionalComponentsStyleModel,
        ),
      [styleModel?.additionalComponentsStyleModel],
    );

  return {
    unwrappedTableModel,
    unwrappedAdditionalStyleModel,
  };
};

export default UseUnwrappedGridStyles;
