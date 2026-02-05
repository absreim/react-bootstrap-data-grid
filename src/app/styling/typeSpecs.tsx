import { SpecTableRow } from "@/shared/TypeSpecTable";

export const additionalComponentsStyleModel: SpecTableRow[] = [
  {
    propertyName: "topLevelDiv",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        <p>
          CSS classes for the top level <i>div</i> element that contains other
          divs, the following order:
        </p>
        <ul>
          <li>
            A div that contains the button to toggle the visibility of the
            filter options table followed by the filter options table itself
          </li>
          <li>
            A div that contains he main table for displaying data followed by
            the pagination component (if pagination is enabled)
          </li>
        </ul>
      </>
    ),
  },
  {
    propertyName: "filterInputsDiv",
    typeDefinition: "string[]",
    isRequired: false,
    description:
      "CSS classes for the div that contains toggle button for the " +
      "filter options table followed by the filter options table itself",
  },
  {
    propertyName: "tableAndPaginationDiv",
    typeDefinition: "string[]",
    isRequired: false,
    description:
      "CSS classes for the div that contains main table followed by the " +
      "pagination component if pagination is enabled",
  },
  {
    propertyName: "filterUiToggleButton",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        CSS classes for the button that toggles the visibility of the filter
        options table. Only appears if filtering is enabled (by supplying the{" "}
        <code>filterModel</code> prop) on the <code>Grid</code> component.
      </>
    ),
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
        Specifies additional CSS classes for the <i>tbody</i> element of the
        main table.
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
        main table.
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
