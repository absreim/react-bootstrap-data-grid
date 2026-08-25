import {
  AdditionalComponentsStyleModel,
  FilterInputTableStyleModel,
  TableStyleModel,
} from "../../table";

/**
 * CSS styles for the toolbar.
 *
 * @public
 */
export interface ToolbarStyleModel {
  /**
   * Styles for the button of the currently selected tool.
   */
  activeButton?: string[];
  /**
   * Styles for the buttons of tools that are not currently selected.
   */
  inactiveButton?: string[];
  /**
   * Styles for the div element that contains the other elements of the toolbar.
   */
  toolbar?: string[];
  /**
   * Styles for the div element that contains the interface for each tool.
   */
  interfaceContainer?: string[];
}

/**
 * CSS styles for the UI for exporting data.
 *
 * @public
 */
export interface ExportFormStyleModel {
  /**
   * Styles for fieldset legend elements.
   */
  legend?: string[];
  /**
   * Styles for the div elements that contain radio buttons.
   */
  radioContainer?: string[];
  /**
   * Styles for the radio button input elements.
   */
  radioInput?: string[];
  /**
   * Styles for the label elements for radio button input elements.
   */
  radioLabel?: string[];
  /**
   * Styles for the submit button.
   */
  submitButton?: string[];
}

/**
 * Top level object that is passed as a prop to a table to enable custom styles.
 *
 * @public
 */
export interface StyleModel {
  /**
   * Styles for the main table (as opposed to the filter options table).
   */
  mainTableStyleModel?: TableStyleModel;
  /**
   * Styles for the filter options table.
   */
  filterInputTableStyleModel?: FilterInputTableStyleModel;
  /**
   * Styles for components that don't fit into other categories.
   */
  additionalComponentsStyleModel?: AdditionalComponentsStyleModel;
  /**
   * Styles for the toolbar.
   */
  toolbarStyleModel?: ToolbarStyleModel;
  /**
   * Styles for the data export UI.
   */
  exportFormStyleModel?: ExportFormStyleModel;
}
