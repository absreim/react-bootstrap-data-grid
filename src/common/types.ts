/**
 * Union of all possible column data types.
 *
 * @public
 */
export type ColDataType = string | number | Date;
/**
 * Union of strings that describe the type of a column.
 *
 * @public
 */
export type ColDataTypeStrings = "string" | "number" | "date" | "datetime";

/**
 * Properties to a define a column that is shared between community and pro
 * editions.
 *
 * @typeParam ValueType - the type of the value of the column (e.g. string,
 * number, or Date)
 *
 * @public
 */
export interface ColDefBase<ValueType = any> {
  /**
   * String that specifies the data type of the column.
   */
  type: ColDataTypeStrings;
  /**
   * The name of the property for the column in the {@link RowDef} object.
   */
  name: string;
  /**
   * The display name of the property in places like the column heading.
   */
  label: string;
  /**
   * The formatter function for the column.
   */
  formatter?: (value: ValueType) => string;
  /**
   * Specifies whether the column is sortable.
   *
   * @defaultValue false
   */
  sortable?: boolean;
}

/**
 * Column definition properties specific to the community edition of the table
 * and grid.
 *
 * @public
 */
export interface CommunitySpecificColProps {
  /**
   * Sets the min-width and max-width CSS properties for all cells of the
   * column.
   *
   * For the table, if no value is specified, then no value for min-width
   * or max-width will be set.
   *
   * @defaultValue - 100 for the grid, undefined for the table
   */
  width?: number;
}

/**
 * Column definition object for the community edition of the table and grid.
 *
 * @typeParam ValueType - the type of the value of the column (e.g. string,
 * number, or Date)
 *
 * @public
 */
export type ColDef<ValueType = any> = ColDefBase<ValueType> &
  CommunitySpecificColProps;
/**
 * Type alias for "data" property of the {@link RowDef} interface. This type
 * alias represents the most general type possible. One can specify a more
 * specific type via the Data type parameter.
 *
 * @public
 */
export type ValidRowData = Record<string, any>;

/**
 * The data fields for a row in a table or grid. Excludes the primary key for
 * the row, which is stored separately in the "id" field of the {@link RowDef}
 * interface.
 *
 * @typeParam Data - the type of the object. A more specific type can be
 * specified in place of the default {@link ValidRowData} type to assist in
 * type safety and IDE coding assistance.
 *
 * @public
 */
export type RowData<Data extends ValidRowData = ValidRowData> = Data;

/**
 * A union of the possible values for an id of a {@link RowDef} object.
 *
 * @public
 */
export type RowId = string | number;

/**
 * An object that represents a single row.
 *
 * @typeParam Data - the type of the "data" property. Can be specified to
 * enhance type safety.
 *
 * @public
 */
export interface RowDef<Data extends ValidRowData = ValidRowData> {
  /**
   * An id for the row that must be unique among all rows passed in the "rows"
   * prop of the {@link Table} or {@link Grid}.
   */
  id: RowId;
  /**
   * Contains all data fields for different columns of the row.
   */
  data: RowData<Data>;
}

/**
 * Interface that contains parameters shared between the Table, TablePro, and
 * Grid components.
 *
 * @public
 */
export interface MainComponentSharedProps {
  /**
   * The rows of data to be displayed by the table or grid
   */
  rows: RowDef[];

  /**
   * The column definitions of the table or grid
   */
  cols: ColDef[];
}

/**
 * {@link RowDef} object that additionally contains the index of the row in the
 * original array.
 *
 * @public
 */
export type AugRowDef<Data extends ValidRowData = ValidRowData> =
  RowDef<Data> & {
    origIndex: number;
  };

/**
 * Row definition object that additionally contains index of the row before
 * pagination was applied.
 *
 * @public
 */
export type PostPaginationRowDef<Data extends ValidRowData = ValidRowData> =
  AugRowDef<Data> & {
    prePaginationIndex: number;
  };

/**
 * Object that describes the contents for a single table or grid cell along
 * with various metadata.
 *
 * @public
 */
export interface CellData {
  /**
   * The name of the property in the {@link RowDef} "data" property that
   * contains the value for the cell.
   */
  fieldName: string;
  /**
   * The raw, unformatted, value of the cell.
   */
  value: ColDataType;
  /**
   * A string that specifies of the value type of the column for the cell.
   * Same as the "type" property in corresponding {@link ColDef} object.
   */
  type: ColDataTypeStrings;
  /**
   * The ARIA column index of the column that contains the cell.
   */
  ariaColIndex: number;
  /**
   * The value of the cell after the column's formatter function is applied.
   */
  formattedValue: string;
  /**
   * The label of the column that the cell is in. Same as the property of the
   * same name in the corresponding {@link ColDef} object.
   */
  label: string;
  /**
   * The width of the column that the cell is in. Same as the property of the
   * same name in the corresponding {@link ColDef} object.
   */
  width?: number;
}

/**
 * Comprehensive information for an entire row of a table or grid, after
 * postprocessing such as sorting, pagination, and filtering are applied.
 *
 * Contains an array of {@link CellData} in the order that the columns appear.
 *
 * @public
 */
export type FormattedRow = {
  contents: Omit<CellData, "width">[];
} & Omit<PostPaginationRowDef, "data">;

/**
 * Like {@link FormattedRow}, but additionally contains the "width" property
 * for the column definition related to each cell.
 *
 * @internal
 */
export type AugFormattedRow = {
  contents: CellData[];
} & Omit<PostPaginationRowDef, "data">;
