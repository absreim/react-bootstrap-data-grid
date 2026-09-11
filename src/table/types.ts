import {
  StyleModel,
  ColDefBase,
  MainComponentSharedProps,
  ColSortModel,
  PaginationModel,
  SortModel,
  FilterModel,
  SelectModel,
  EditModel,
} from "../common";

export type DisplayMode = "table" | "block";

/**
 * Props specific to the {@link Table} component and not the {@link Grid}
 * component.
 *
 * @public
 */
export interface TableSpecificProps {
  /**
   * The pagination model of the table. Passing a truthy value enables
   * the pagination feature of the component.
   */
  pagination?: PaginationModel;

  /**
   * The sort model of the table. Passing a truthy value enables the
   * sorting feature of the component.
   */
  sortModel?: SortModel;

  /**
   * The filter model of the table. Passing a truthy value enables the
   * filtering feature of the component.
   */
  filterModel?: FilterModel;

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
   * Enables exporting of data from the table.
   */
  allowExport?: boolean;

  /**
   * Sets a caption for the table
   */
  caption?: string;

  /**
   * Sets the CSS display property for the table element
   *
   * @defaultValue `"table"`
   */
  displayMode?: DisplayMode;
}

/**
 * The type of the props object for the Table component.
 *
 * @public
 */
export type TableProps = MainComponentSharedProps & TableSpecificProps;

/**
 * All props that community and pro versions of the table have in common
 *
 * @internal
 */
export type BaseTableProps = Omit<TableProps, "cols"> & {
  cols: ColDefBase[];
};

/**
 * Props for the {@link ColHeaderCell} component.
 *
 * @internal
 */
export interface ColHeaderCellProps {
  label: string;
  sortModel?: ColSortModel;
  ariaColIndex: number;
  additionalClasses?: string[] | null;
  width?: number;
}
