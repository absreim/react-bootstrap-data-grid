import { MultiSelectModel, SingleSelectModel } from "@/grid";

export type MultiSelectModelInitialState = Omit<
  MultiSelectModel,
  "setSelected"
>;
export type SingleSelectModelInitialState = Omit<
  SingleSelectModel,
  "setSelected"
>;
