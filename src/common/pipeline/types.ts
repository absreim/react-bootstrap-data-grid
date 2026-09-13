/**
 * A hash map that associates column name to a width setting.
 *
 * @internal
 */
export type ColNameToWidth<ColName extends string = string> = Record<
  ColName,
  number | undefined
>;
