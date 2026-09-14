import { CSSProperties } from "react";

/**
 * Given a number representing a width, returns a React CSSProperties object
 * that sets the min-width and max-width CSS properties based on that number.
 * Returns undefined if the input is undefined.
 *
 * @param width - the number representing the width, or undefined
 *
 * @internal
 */
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
