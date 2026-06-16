import { CSSProperties } from "react";

const getWidthStyles: (width: number) => CSSProperties = (width) => ({
  width: width,
  maxWidth: width,
  minWidth: width
});

export default getWidthStyles;
