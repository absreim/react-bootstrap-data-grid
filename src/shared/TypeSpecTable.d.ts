import { FC, ReactNode } from "react";
export interface SpecTableRow {
  propertyName: string;
  typeDefinition: string;
  isRequired: boolean;
  description: string | ReactNode;
}
interface Props {
  caption?: string;
  rows: SpecTableRow[];
}
declare const TypeSpecTable: FC<Props>;
export default TypeSpecTable;
