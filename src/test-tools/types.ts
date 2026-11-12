export interface BasicTestRow {
  strCol: string;
  numCol: number;
  date: Date;
  datetime: Date;
}

export type BooleanOptionName = "true" | "false" | "unset";

export type BooleanOptions = Record<
  BooleanOptionName,
  { label: string; value: boolean | undefined }
>;

export type GapOptions = Record<
  string,
  { label: string; value: number | undefined }
>;

export type AlignSettingString = "left" | "center" | "right";

export type AlignOptions = Record<
  AlignSettingString | "unset",
  { label: string; value: AlignSettingString | undefined }
>;
