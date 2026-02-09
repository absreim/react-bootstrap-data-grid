import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
export var additionalComponentsStyleModel = [
  {
    propertyName: "topLevelDiv",
    typeDefinition: "string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        _jsxs("p", {
          children: [
            "CSS classes for the top level ",
            _jsx("i", { children: "div" }),
            " element that contains other divs, the following order:",
          ],
        }),
        _jsxs("ul", {
          children: [
            _jsx("li", {
              children:
                "A div that contains the button to toggle the visibility of the filter options table followed by the filter options table itself",
            }),
            _jsx("li", {
              children:
                "A div that contains he main table for displaying data followed by the pagination component (if pagination is enabled)",
            }),
          ],
        }),
      ],
    }),
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
    description: _jsxs(_Fragment, {
      children: [
        _jsxs("p", {
          children: [
            "CSS classes for the button that toggles the visibility of the filter options table. Only appears if filtering is enabled (by supplying the",
            " ",
            _jsx("code", { children: "filterModel" }),
            " prop) on the ",
            _jsx("code", { children: "Grid" }),
            " component.",
          ],
        }),
        _jsxs("p", {
          children: [
            "The variant of this button is set to ",
            _jsx("i", { children: "primary" }),
            " by default via the",
            " ",
            _jsx("code", { children: "btn-primary" }),
            " class. That class will not be applied if a non-empty is passed via this property.",
          ],
        }),
      ],
    }),
  },
];
export var styleModel = [
  {
    propertyName: "mainTableStyleModel",
    typeDefinition: "TableStyleModel",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Properties to apply custom CSS classes to elements of the main table of the ",
        _jsx("code", { children: "Grid" }),
        " component",
      ],
    }),
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
    description: _jsxs(_Fragment, {
      children: [
        "Properties to apply custom CSS classes for any elements not covered by the other properties in ",
        _jsx("code", { children: "StyleModel" }),
      ],
    }),
  },
];
export var tableStyleModel = [
  {
    propertyName: "table",
    typeDefinition: "string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the main table element. This element always has the ",
        _jsx("code", { children: "table" }),
        " class to apply Bootstrap styles. In addition, when row selection mode is enabled, the table will have the ",
        _jsx("code", { children: "table-hover" }),
        " class to indicate that the rows are selectable by clicking on them.",
      ],
    }),
  },
  {
    propertyName: "tbody",
    typeDefinition: "string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "tbody" }),
        " element of the main table.",
      ],
    }),
  },
  {
    propertyName: "thead",
    typeDefinition: "string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "thead" }),
        " element of the main table.",
      ],
    }),
  },
  {
    propertyName: "theadTr",
    typeDefinition: "string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the sole ",
        _jsx("i", { children: "tr" }),
        " element of the",
        " ",
        _jsx("i", { children: "thead" }),
        " element of the main table.",
      ],
    }),
  },
  {
    propertyName: "theadTh",
    typeDefinition: "(colIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for ",
        _jsx("i", { children: "th" }),
        " elements inside the",
        " ",
        _jsx("i", { children: "thead" }),
        " element of the main table. For columns are currently being used for sorting, the ",
        _jsx("code", { children: "Grid" }),
        " will automatically apply the",
        " ",
        _jsx("code", { children: "table-active" }),
        " class. In addition, if a column is available as an option for sorting, the ",
        _jsx("code", { children: "Grid" }),
        " will use a CSS class (specific to this project) to set the cursor to be a pointer.",
      ],
    }),
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
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for ",
        _jsx("i", { children: "tr" }),
        " elements inside the",
        " ",
        _jsx("i", { children: "tbody" }),
        " element of the main table. The ",
        _jsx("code", { children: "Grid" }),
        " component will automatically apply the ",
        _jsx("code", { children: "table-active" }),
        " class to selected rows.",
      ],
    }),
  },
  {
    propertyName: "tbodyTd",
    typeDefinition:
      "(origRowIndex: number, displayRowIndex: number, colIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for ",
        _jsx("i", { children: "td" }),
        " elements in side the",
        " ",
        _jsx("i", { children: "tbody" }),
        " element of the main table.",
      ],
    }),
  },
  {
    propertyName: "editColTh",
    typeDefinition: "string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "th" }),
        " element of the editing controls column.",
      ],
    }),
  },
  {
    propertyName: "editColTd",
    typeDefinition: "(origIndex: number, displayIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "td" }),
        " elements of the editing controls column.",
      ],
    }),
  },
  {
    propertyName: "selectColTh",
    typeDefinition: "string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "th" }),
        " element of the selection controls column.",
      ],
    }),
  },
  {
    propertyName: "selectColTd",
    typeDefinition: "(origIndex: number, displayIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "td" }),
        " elements of the selection controls column.",
      ],
    }),
  },
  {
    propertyName: "selectInput",
    typeDefinition: "(origIndex: number, displayIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "input" }),
        " elements inside the ",
        _jsx("i", { children: "td" }),
        " elements of the selection controls column.",
      ],
    }),
  },
  {
    propertyName: "editStartButton",
    typeDefinition: "(origIndex: number, displayIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies the styles for all ",
        _jsx("i", { children: "Edit" }),
        " buttons of the editing controls column. The ",
        _jsx("code", { children: "Grid" }),
        " automatically applies the",
        " ",
        _jsx("code", { children: "btn-primary" }),
        " class to these buttons, but if a array of non-zero length is supplied, the ",
        _jsx("code", { children: "btn-primary" }),
        " class will not be applied, allowing for customization of the button variant.",
      ],
    }),
  },
  {
    propertyName: "editDeleteButton",
    typeDefinition: "(origIndex: number, displayIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies the styles for all ",
        _jsx("i", { children: "Delete" }),
        " buttons of the editing controls column. The ",
        _jsx("code", { children: "Grid" }),
        " automatically applies the",
        " ",
        _jsx("code", { children: "btn-secondary" }),
        " class to these buttons, but if a array of non-zero length is supplied, the ",
        _jsx("code", { children: "btn-secondary" }),
        " class will not be applied, allowing for customization of the button variant.",
      ],
    }),
  },
  {
    propertyName: "editSaveButton",
    typeDefinition: "(origIndex: number, displayIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies the styles for all ",
        _jsx("i", { children: "Save" }),
        " buttons of the editing controls column. The ",
        _jsx("code", { children: "Grid" }),
        " automatically applies the",
        " ",
        _jsx("code", { children: "btn-primary" }),
        " class to these buttons, but if a array of non-zero length is supplied, the ",
        _jsx("code", { children: "btn-primary" }),
        " class will not be applied, allowing for customization of the button variant.",
      ],
    }),
  },
  {
    propertyName: "editCancelButton",
    typeDefinition: "(origIndex: number, displayIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies the styles for all ",
        _jsx("i", { children: "Cancel" }),
        " buttons of the editing controls column. The ",
        _jsx("code", { children: "Grid" }),
        " automatically applies the",
        " ",
        _jsx("code", { children: "btn-secondary" }),
        " class to these buttons, but if a array of non-zero length is supplied, the ",
        _jsx("code", { children: "btn-secondary" }),
        " class will not be applied, allowing for customization of the button variant.",
      ],
    }),
  },
  {
    propertyName: "rowSelectColTh",
    typeDefinition: "string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        _jsxs("p", {
          children: [
            "Specifies additional classes of the ",
            _jsx("i", { children: "th" }),
            " element that contains the control for selecting and deselecting all rows. The cell only appears if selection for the ",
            _jsx("code", { children: "Grid" }),
            " is enabled by passing a",
            " ",
            _jsx("code", { children: "selectModel" }),
            " prop.",
          ],
        }),
        _jsxs("p", {
          children: [
            "By default, the CSS classes ",
            _jsx("code", { children: "btn-primary" }),
            " and",
            " ",
            _jsx("code", { children: "rbdg-select-header-cell" }),
            " are applied. The",
            " ",
            _jsx("code", { children: "rbdg-select-header-cell" }),
            " class colors the SVG icon of the control based on the Bootstrap button variant. To maximize customizability, the ",
            _jsx("code", { children: "btn-primary" }),
            " class will be omitted if an array of length at least 1 is passed in for this property, allowing one to change the variant of the SVG icon in this cell with a different variant (e.g. ",
            _jsx("code", { children: "btn-secondary" }),
            ".)",
          ],
        }),
        _jsxs("p", {
          children: [
            "There is also a class ",
            _jsx("code", { children: "rbdg-clickable-grid-header-cell" }),
            " ",
            "that changes the mouse pointer based on whether the cell is clickable.",
          ],
        }),
      ],
    }),
  },
  {
    propertyName: "rowSelectColTd",
    typeDefinition: "(origIndex: number, displayIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional classes of the ",
        _jsx("i", { children: "td" }),
        " elements in the selection controls column",
      ],
    }),
  },
  {
    propertyName: "rowSelectInput",
    typeDefinition: "(origIndex: number, displayIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional classes of the ",
        _jsx("i", { children: "input" }),
        " elements in the selection controls column",
      ],
    }),
  },
];
export var filterInputTableStyleModel = [
  {
    propertyName: "table",
    typeDefinition: "string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "table" }),
        " element of filter options interface. This element always has the ",
        _jsx("code", { children: "table" }),
        " class to apply Bootstrap styles.",
      ],
    }),
  },
  {
    propertyName: "tbody",
    typeDefinition: "string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "tbody" }),
        " element of the filter options table.",
      ],
    }),
  },
  {
    propertyName: "thead",
    typeDefinition: "string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "thead" }),
        " element of the filter options table.",
      ],
    }),
  },
  {
    propertyName: "theadTr",
    typeDefinition: "string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the sole ",
        _jsx("i", { children: "tr" }),
        " element of the",
        " ",
        _jsx("i", { children: "thead" }),
        " element of the filter options table.",
      ],
    }),
  },
  {
    propertyName: "theadTh",
    typeDefinition: "(colIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for ",
        _jsx("i", { children: "th" }),
        " elements inside the",
        " ",
        _jsx("i", { children: "thead" }),
        " element of the filter options table.",
      ],
    }),
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
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for ",
        _jsx("i", { children: "tr" }),
        " elements inside the",
        " ",
        _jsx("i", { children: "tbody" }),
        " element of the filter options table.",
      ],
    }),
  },
  {
    propertyName: "tbodyTd",
    typeDefinition: "(index: number, colIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for ",
        _jsx("i", { children: "td" }),
        " elements in side the",
        " ",
        _jsx("i", { children: "tbody" }),
        " element of the filter options table.",
      ],
    }),
  },
  {
    propertyName: "enablementInput",
    typeDefinition: "(rowIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for ",
        _jsx("i", { children: "input" }),
        " checkbox elements that enable and disable filtering based on certain fields.",
      ],
    }),
  },
  {
    propertyName: "schemeSelectionInput",
    typeDefinition: "(rowIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "select" }),
        " elements that are used to adjust the operators used for filtering for a field.",
      ],
    }),
  },
  {
    propertyName: "searchStringInput",
    typeDefinition: "(rowIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "input" }),
        " elements used to specify string values on which to filter. This property only applies if the row is associated with a column of type string. It is up to the developer to confirm that fact.",
      ],
    }),
  },
  {
    propertyName: "numberInput",
    typeDefinition: "(rowIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "input" }),
        " elements used to specify the number values on which to filter. This property only applies if the row is associated with a column of type number. It is up to the developer to confirm that fact.",
      ],
    }),
  },
  {
    propertyName: "startDateInput",
    typeDefinition: "(rowIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "input" }),
        " elements used to specify the starting dates or datetimes on which to filter. This property only applies if the row is associated with a column of type date or datetime. It is up to the developer to confirm that fact.",
      ],
    }),
  },
  {
    propertyName: "endDateInput",
    typeDefinition: "(rowIndex: number) => string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the ",
        _jsx("i", { children: "input" }),
        " elements used to specify the ending dates or datetimes on which to filter. This property only applies if the row is associated with a column of type date or datetime. It is up to the developer to confirm that fact.",
      ],
    }),
  },
  {
    propertyName: "submitButton",
    typeDefinition: "string[]",
    isRequired: false,
    description: _jsxs(_Fragment, {
      children: [
        "Specifies additional CSS classes for the submit button used to save changes to the filter criteria. The ",
        _jsx("code", { children: "btn-secondary" }),
        " class is applied automatically, but will not be applied if an array of length at least 1 is passed for property.",
      ],
    }),
  },
];
