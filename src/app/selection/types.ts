import { MultiSelectModel, SingleSelectModel } from "@/table";

export type MultiSelectModelInitialState = Omit<
  MultiSelectModel,
  "setSelected"
>;
export type SingleSelectModelInitialState = Omit<
  SingleSelectModel,
  "setSelected"
>;
