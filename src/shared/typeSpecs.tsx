import { SpecTableRow } from "@/shared/TypeSpecTable";

export const tableSortModel: SpecTableRow[] = [
  {
    propertyName: "sortColDef",
    typeDefinition: "SortColDef | null",
    isRequired: true,
    description: "The current setting for sorting for the Grid",
  },
  {
    propertyName: "setSortColDef",
    typeDefinition: "(sortColDef: SortColDef | null) => void",
    isRequired: true,
    description: (
      <p>
        Callback function to set the state of <code>sortColDef</code> in
        response to user input
      </p>
    ),
  },
];

export const sortColDef: SpecTableRow[] = [
  {
    propertyName: "name",
    typeDefinition: "string",
    isRequired: true,
    description: "The name of the column to sort",
  },
  {
    propertyName: "order",
    typeDefinition: '"asc" | "desc"',
    isRequired: true,
    description: "The sort order, ascending or descending",
  },
];
