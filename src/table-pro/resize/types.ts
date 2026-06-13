export interface ColResizeModel {
  width: number | undefined;
  setWidth: ((width: number) => void) | undefined;
}

export type ResizeModel<ColName extends string = string> = Record<
  ColName,
  ColResizeModel
>;
