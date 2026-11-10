import { ControlledPaginationModel } from "./types";

/**
 * Effective value for the {@link PaginationModel} that takes in values
 * depending on whether controlled or uncontrolled mode is selected.
 *
 * @internal
 */
export type NormalizedPaginationModel = Required<
  Omit<
    ControlledPaginationModel,
    "type" | "pageSelectorAriaLabel" | "pageSelectorJustifyContent" | "showTextLabel"
  >
> &
  Pick<
    ControlledPaginationModel,
    "pageSelectorAriaLabel" | "pageSelectorJustifyContent" | "showTextLabel"
  >;
