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

export const styleModel: SpecTableRow[] = [
  {
    propertyName: "mainTableStyleModel",
    typeDefinition: "TableStyleModel",
    isRequired: false,
    description: (
      <>
        Properties to apply custom CSS classes to elements of the main table of
        the <code>Grid</code> component
      </>
    ),
  },
  {
    propertyName: "filterInputTableStyleModel",
    typeDefinition: "FilterInputTableStyleModel",
    isRequired: false,
    description:
      "Properties to apply custom CSS classes to elements of the filter inputs table",
  },
  {
    propertyName: "additionalComponentsStyleModel",
    typeDefinition: "AdditionalComponentsStyleModel",
    isRequired: false,
    description: (
      <>
        Properties to apply custom CSS classes for any elements not covered by
        the other properties in <code>StyleModel</code>
      </>
    ),
  },
];

export const tableStyleModel: SpecTableRow[] = [
  {
    propertyName: "table",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the main table element. This
        element always has the <code>table</code> class to apply Bootstrap
        styles. In addition, when row selection mode is enabled, the table will
        have the <code>table-hover</code> class to indicate that the rows are
        selectable by clicking on them.
      </>
    ),
  },
  {
    propertyName: "tbody",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>tbody</i> element of
        the main table.
      </>
    ),
  },
  {
    propertyName: "thead",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>thead</i> element of
        the main table.
      </>
    ),
  },
  {
    propertyName: "theadTr",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the sole <i>tr</i> element of the{" "}
        <i>thead</i> element of the main table.
      </>
    ),
  },
  {
    propertyName: "theadTh",
    typeDefinition: "(colIndex: number) => string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for <i>th</i> elements inside the{" "}
        <i>thead</i> element of the main table. For columns are currently being
        used for sorting, the <code>Grid</code> will automatically apply the{" "}
        <code>table-active</code> class. In addition, if a column is available
        as an option for sorting, the <code>Grid</code> will use a CSS class
        (specific to this project) to set the cursor to be a pointer.
      </>
    ),
  },
  {
    propertyName: "caption",
    typeDefinition: "string[]",
    isRequired: false,
    description:
      "Specifies additional CSS classes for the caption element of the main table.",
  },
  {
    propertyName: "tbodyTr",
    typeDefinition: "(origIndex: number, displayIndex: number) => string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for <i>tr</i> elements inside the{" "}
        <i>tbody</i> element of the main table. The <code>Grid</code> component
        will automatically apply the <code>table-active</code> class to selected
        rows.
      </>
    ),
  },
  {
    propertyName: "tbodyTd",
    typeDefinition:
      "(origRowIndex: number, displayRowIndex: number, colIndex: number) => string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for <i>td</i> elements in side the{" "}
        <i>tbody</i> element of the main table.
      </>
    ),
  },
  {
    propertyName: "editColTh",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>th</i> element of the
        editing controls column.
      </>
    ),
  },
  {
    propertyName: "editColTd",
    typeDefinition: "(origIndex: number, displayIndex: number) => string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>td</i> elements of the
        editing controls column.
      </>
    ),
  },
  {
    propertyName: "selectColTh",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>th</i> element of the
        selection controls column.
      </>
    ),
  },
  {
    propertyName: "selectColTd",
    typeDefinition: "(origIndex: number, displayIndex: number) => string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>td</i> elements of the
        selection controls column.
      </>
    ),
  },
  {
    propertyName: "selectInput",
    typeDefinition: "(origIndex: number, displayIndex: number) => string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>input</i> elements inside
        the <i>td</i> elements of the selection controls column.
      </>
    ),
  },
  {
    propertyName: "editPrimaryButton",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies the styles for all <i>Edit</i> and <i>Save</i> buttons of the
        editing controls column. The <code>Grid</code> automatically applies the{" "}
        <code>btn-primary</code> class to these buttons.
      </>
    ),
  },
  {
    propertyName: "editSecondaryButton",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies the styles for all <i>Delete</i> and <i>Cancel</i> buttons of
        the editing controls column. The <code>Grid</code> automatically applies
        the <code>btn-secondary</code> class to these buttons.
      </>
    ),
  },
];

export const filterInputTableStyleModel: SpecTableRow[] = [
  {
    propertyName: "table",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>table</i> element of filter
        options interface. This element always has the <code>table</code> class
        to apply Bootstrap styles.
      </>
    ),
  },
  {
    propertyName: "tbody",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>tbody</i> element of the
        filter options table.
      </>
    ),
  },
  {
    propertyName: "thead",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>thead</i> element of the
        filter options table.
      </>
    ),
  },
  {
    propertyName: "theadTr",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the sole <i>tr</i> element of the{" "}
        <i>thead</i> element of the filter options table.
      </>
    ),
  },
  {
    propertyName: "theadTh",
    typeDefinition: "(colIndex: number) => string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for <i>th</i> elements inside the{" "}
        <i>thead</i> element of the filter options table.
      </>
    ),
  },
  {
    propertyName: "caption",
    typeDefinition: "string[]",
    isRequired: false,
    description:
      "Specifies additional CSS classes for the caption element of the filter options table.",
  },
  {
    propertyName: "tbodyTr",
    typeDefinition: "(index: number) => string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for <i>tr</i> elements inside the{" "}
        <i>tbody</i> element of the filter options table.
      </>
    ),
  },
  {
    propertyName: "tbodyTd",
    typeDefinition: "(index: number, colIndex: number) => string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for <i>td</i> elements in side the{" "}
        <i>tbody</i> element of the filter options table.
      </>
    ),
  },
  {
    propertyName: "enablementInput",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for <i>input</i> checkbox elements that
        enable and disable filtering based on certain fields.
      </>
    ),
  },
  {
    propertyName: "schemeSelectionInput",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>select</i> elements that are
        used to adjust the operators used for filtering for a field.
      </>
    ),
  },
  {
    propertyName: "searchStringInput",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>input</i> elements used to
        specify string values on which to filter.
      </>
    ),
  },
  {
    propertyName: "numberInput",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>input</i> elements used to
        specify the number values on which to filter.
      </>
    ),
  },
  {
    propertyName: "startDateInput",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>input</i> elements used to
        specify the starting dates or datetimes on which to filter.
      </>
    ),
  },
  {
    propertyName: "endDateInput",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Specifies additional CSS classes for the <i>input</i> elements used to
        specify the ending dates or datetimes on which to filter.
      </>
    ),
  },
  {
    propertyName: "submitButton",
    typeDefinition: "string[]",
    isRequired: false,
    description:
      "Specifies additional CSS classes for the submit button used to save changes to the filter criteria.",
  },
];
