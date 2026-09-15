/**
 * Sort order setting for the sort feature.
 *
 * @public
 */
export type SortOrder = "asc" | "desc";

/**
 * Specifies the column to sort on and order with which to sort.
 *
 * @public
 */
export interface SortColDef {
  /**
   * The name of the column. Corresponds to the name in the {@link ColDef}
   * type.
   */
  name: string;
  /**
   * Order with which sorting should be done.
   */
  order: SortOrder;
}

/**
 * Externally-controllable variant of the {@link SortModel}.
 *
 * @public
 */
export interface ControlledSortModel {
  /**
   * A type discriminator.
   */
  type?: "controlled";
  /**
   * Information on the column to sort on. Null means no column is being sorted
   * and the rows shown be shown in their original order.
   */
  sortColDef: SortColDef | null;
  /**
   * Setter function for sortColDef.
   */
  setSortColDef: (sortColDef: SortColDef | null) => void;
}

/**
 * Uncontrolled variant of the {@link SortModel}.
 *
 * @public
 */
export interface UncontrolledSortModel {
  /**
   * A type discriminator.
   */
  type: "uncontrolled";
  /**
   * Initial column to sort on, if any.
   */
  initialSortColDef: SortColDef | null;
}

/**
 * Prop that enables and configures sorting on a grid or table.
 *
 * @public
 */
export type SortModel = ControlledSortModel | UncontrolledSortModel;
