export interface ControlledColResizeModel {
  width: number;
  setWidth: (width: number) => void;
}

export interface UncontrolledColResizeModel {
  initWidth: number;
}

export interface ControlledResizeModel<ColName extends string = string> {
  type: "controlled";
  cols: Record<ColName, ControlledColResizeModel>;
}

export interface UncontrolledResizeModel<ColName extends string = string> {
  type: "uncontrolled";
  cols: Record<ColName, UncontrolledColResizeModel>;
}

export type ResizeModel<ColName extends string = string> =
  | ControlledResizeModel<ColName>
  | UncontrolledResizeModel<ColName>;
