/**
 * Width numerical value getter/setter pair that can support unspecified
 * values.
 *
 * @internal
 */
export interface ColResizeModel {
  width: number | undefined;
  setWidth: ((width: number) => void) | undefined;
}

/**
 * {@link Record} that contains {@link ColResizeModel} for each column.
 *
 * @typeParam ColName - type of the name of the column. Can specify a more
 * restrictive type for type safety.
 *
 * @internal
 */
export type ResizeModel<ColName extends string = string> = Record<
  ColName,
  ColResizeModel
>;
