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

export const filterModel: SpecTableRow[] = [
  {
    propertyName: "tableFilterState",
    typeDefinition: "EditableTableFilterState",
    isRequired: true,
    description:
      "The state the represents the filtering options that are currently selected",
  },
  {
    propertyName: "setTableFilterState",
    typeDefinition: "(state: EditableTableFilterState) => void",
    isRequired: true,
    description: "Function to set a new tableFilterState",
  },
];

export const abstractFilterState: SpecTableRow[] = [
  {
    propertyName: "enabled",
    typeDefinition: "boolean",
    isRequired: true,
    description:
      "Flag representing whether this column's filter should be applied",
  },
];

export const stringFilterState: SpecTableRow[] = [
  {
    propertyName: "type",
    typeDefinition: "'string'",
    isRequired: true,
    description:
      "A type discriminator used to differentiate between different column types. " +
      "Note that the type is the literal string 'string', not the JavaScript string type.",
  },
  {
    propertyName: "scheme",
    typeDefinition: "StringFilterScheme",
    isRequired: true,
    description: "The kind of string filter to apply",
  },
  {
    propertyName: "searchString",
    typeDefinition: "string",
    isRequired: true,
    description: "The search string with which to apply the filter",
  },
];

export const numberFilterState: SpecTableRow[] = [
  {
    propertyName: "type",
    typeDefinition: "'number'",
    isRequired: true,
    description:
      "A type discriminator used to differentiate between different column types. " +
      "Note that the type is the literal string 'number', not the JavaScript number type.",
  },
  {
    propertyName: "scheme",
    typeDefinition: "NumberFilterScheme",
    isRequired: true,
    description: "The kind of number filter to apply",
  },
  {
    propertyName: "numValue",
    typeDefinition: "number | null",
    isRequired: true,
    description:
      "The number with which to apply the filter. A null value represents an empty number input value.",
  },
];

export const abstractDateFilterState: SpecTableRow[] = [
  {
    propertyName: "type",
    typeDefinition: "'date' | 'datetime'",
    isRequired: true,
    description:
      "A type discriminator used to differentiate between different column types.",
  },
  {
    propertyName: "scheme",
    typeDefinition: "DateFilterScheme",
    isRequired: true,
    description: "The kind of date/datetime filter to apply",
  },
];

export const startDateFilterState: SpecTableRow[] = [
  {
    propertyName: "scheme",
    typeDefinition: "'startFrom'",
    isRequired: true,
    description:
      "A type discriminator used to differentiate between date filter types.",
  },
  {
    propertyName: "startDate",
    typeDefinition: "Date | null",
    isRequired: true,
    description:
      "The starting date or datetime for the filter to apply. A null value represents an empty date input value.",
  },
];

export const endDateFilterState: SpecTableRow[] = [
  {
    propertyName: "scheme",
    typeDefinition: "'endAt'",
    isRequired: true,
    description:
      "A type discriminator used to differentiate between date filter types.",
  },
  {
    propertyName: "endDate",
    typeDefinition: "Date | null",
    isRequired: true,
    description:
      "The ending date or datetime for the filter to apply. A null value represents an empty date input value.",
  },
];

export const betweenDatesFilterState: SpecTableRow[] = [
  {
    propertyName: "scheme",
    typeDefinition: "'between'",
    isRequired: true,
    description:
      "A type discriminator used to differentiate between date filter types.",
  },
  {
    propertyName: "startDate",
    typeDefinition: "Date | null",
    isRequired: true,
    description:
      "The starting date or datetime for the filter to apply. A null value represents an empty date input value.",
  },
  {
    propertyName: "endDate",
    typeDefinition: "Date | null",
    isRequired: true,
    description:
      "The ending date or datetime for the filter to apply. A null value represents an empty date input value.",
  },
];

export const multiSelectMode: SpecTableRow[] = [
  {
    propertyName: "mode",
    typeDefinition: "SelectMode",
    isRequired: true,
    description:
      "Specified whether to allow selection via inputs elements in a dedicated column, via clicking on rows, or both simultaneously",
  },
  {
    propertyName: "type",
    typeDefinition: "'multi'",
    isRequired: true,
    description:
      "A type discriminator used to differentiate between different selection modes",
  },
  {
    propertyName: "selected",
    typeDefinition: "number[]",
    isRequired: true,
    description:
      "An array of index values that tracks the selected rows. Any rows with an index that is in this array is considered selected.",
  },
  {
    propertyName: "setSelected",
    typeDefinition: "(selected: number[]) => void",
    isRequired: true,
    description:
      "Setter function to update the state that tracks the selected rows",
  },
];

export const singleSelectMode: SpecTableRow[] = [
  {
    propertyName: "mode",
    typeDefinition: "SelectMode",
    isRequired: true,
    description:
      "Specified whether to allow selection via inputs elements in a dedicated column, via clicking on rows, or both simultaneously",
  },
  {
    propertyName: "type",
    typeDefinition: "'single'",
    isRequired: true,
    description:
      "A type discriminator used to differentiate between different selection modes",
  },
  {
    propertyName: "selected",
    typeDefinition: "number | null",
    isRequired: true,
    description:
      "A number value to track the index of the currently selected row, or null if no row is selected.",
  },
  {
    propertyName: "setSelected",
    typeDefinition: "(selected: number | null) => void",
    isRequired: true,
    description:
      "Setter function to update the state that tracks the selected row",
  },
  {
    propertyName: "groupName",
    typeDefinition: "string",
    isRequired: true,
    description:
      "A string used for the 'name' property of radio input elements. It must be unique across the entire page to avoid unexpected behavior.",
  },
];

export const editModel: SpecTableRow[] = [
  {
    propertyName: "getUpdateCallback",
    typeDefinition: "UpdateCallbackGenerator",
    isRequired: true,
    description:
      "A function that takes the original index of a row and returns a callback function for updating a row.",
  },
  {
    propertyName: "getDeleteCallback",
    typeDefinition: "(origIndex: number) => () => void",
    isRequired: false,
    description:
      "A function takes the original index of a row and returns a callback function for deleting the row. Omitting this property disables the UI for deletions.",
  },
];
