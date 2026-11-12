import {
  EditModel,
  MainComponentSharedProps,
  PaginationModel,
  SelectModel,
  StyleModel,
} from "../common";

/**
 * Available options for the displayMode prop of {@link TableSpecificProps}.
 *
 * @public
 */
export type DisplayMode = "table" | "block";

/**
 * Props specific to the {@link Table} component and not the {@link Grid}
 * component.
 *
 * @public
 */
export interface TableSpecificProps {
  /**
   * The select model of the table. Passing a truthy value enables the
   * selection feature of the component.
   */
  selectModel?: SelectModel;

  /**
   * The edit model of the table. Passing a truthy value enables the
   * editing feature of the component.
   */
  editModel?: EditModel;

  /**
   * The style model of the table. Passing a truthy value enables the
   * developer to customize the CSS classes applied to various elements of the
   * table.
   */
  styleModel?: StyleModel;

  /**
   * Sets a caption for the table
   */
  caption?: string;

  /**
   * Sets the CSS display property for the table element.
   *
   * @defaultValue `"table"`
   */
  displayMode?: DisplayMode;

  /**
   * The pagination model of the table. Passing a truthy value enables
   * the pagination feature of the component.
   */
  pagination?: PaginationModel;
}

/**
 * The type of the props object for the Table component.
 *
 * @public
 */
export type TableProps = MainComponentSharedProps & TableSpecificProps;
