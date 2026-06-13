export type ColNameToWidth<ColName extends string = string> = Record<
  ColName,
  number | undefined
>;
