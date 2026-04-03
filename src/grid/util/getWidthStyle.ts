import { CSSProperties } from "react";

const getWidthStyle: (
  width: number | undefined,
) => CSSProperties | undefined = (width) =>
  width === undefined
    ? undefined
    : {
        minWidth: width,
        maxWidth: width,
      };

export default getWidthStyle;
