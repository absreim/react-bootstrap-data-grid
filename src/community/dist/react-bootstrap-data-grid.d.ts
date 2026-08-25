import { CSSProperties } from 'react';
import { FC } from 'react';
import { MouseEventHandler } from 'react';
import { ReactNode } from 'react';

export declare interface AbstractDateFilterState extends AbstractFilterState {
    type: "date" | "datetime";
    scheme: DateFilterScheme;
}

export declare interface AbstractFilterState {
    enabled: boolean;
}

export declare interface AdditionalComponentsStyleModel {
    topLevelDiv?: string[];
    tableAndPaginationDiv?: string[];
    tableDiv?: string[];
    paginationUiDiv?: string[];
}

export declare type AugFormattedRow = {
    contents: CellData[];
} & Omit<PostPaginationRowDef, "data">;

export declare type AugRowDef<Data extends ValidRowData = ValidRowData> = RowDef<Data> & {
    origIndex: number;
};

declare interface BaseSelectModel {
    mode: SelectMode;
    selectColWidth?: number;
}

export declare type BaseTableProps = Omit<TableProps, "cols"> & {
    cols: ColDefBase[];
};

export declare interface BetweenDatesFilterState extends AbstractDateFilterState {
    scheme: "between";
    startDate: Date | null;
    endDate: Date | null;
}

export declare type BodyCellVariantFn = (cell: CellData, row: FormattedRow, colIndex: number, displayIndex: number) => string | null;

export declare interface CellData {
    fieldName: string;
    value: ColDataType;
    type: ColDataTypeStrings;
    ariaColIndex: number;
    formattedValue: string;
    label: string;
    width?: number;
}

export declare type ColDataType = string | number | Date;

export declare type ColDataTypeStrings = "string" | "number" | "date" | "datetime";

export declare type ColDef<ValueType = any> = ColDefBase<ValueType> & {
    width?: number;
};

export declare interface ColDefBase<ValueType = any> {
    type: ColDataTypeStrings;
    name: string;
    label: string;
    formatter?: (value: ValueType) => string;
    sortable?: boolean;
}

export declare interface ColFilterState {
    editableState: EditableColFilterState;
    label: string;
}

export declare interface ColHeaderCellProps {
    label: string;
    sortModel?: ColSortModel;
    ariaColIndex: number;
    additionalClasses?: string[] | null;
    width?: number;
}

export declare type ColNameToWidth<ColName extends string = string> = Record<ColName, number | undefined>;

export declare interface ColSortModel {
    sortOrder: SortOrder | null;
    setSortOrder: (order: SortOrder | null) => void;
}

export declare interface ControlledFilterModel {
    type?: "controlled";
    tableFilterState: EditableFilterState;
    setTableFilterState: (state: EditableFilterState) => void;
    filterTableCaption?: string;
}

export declare type ControlledPaginationModel = PaginationOptions & {
    type?: "controlled";
    pageSizeIndex: number;
    setPageSizeIndex: (pageSizeIndex: number) => void;
    currentPage: number;
    setCurrentPage: (pageNum: number) => void;
};

export declare interface ControlledSortModel {
    type?: "controlled";
    sortColDef: SortColDef | null;
    setSortColDef: (sortColDef: SortColDef | null) => void;
}

export declare type DateFilterScheme = (typeof dateFilterSchemes)[number];

export declare const dateFilterSchemeNames: Record<DateFilterScheme, string>;

export declare const dateFilterSchemes: readonly ["startFrom", "endAt", "between"];

export declare type DateFilterState = StartDateFilterState | EndDateFilterState | BetweenDatesFilterState;

export declare interface DateFormFilterState extends AbstractDateFilterState {
    scheme: DateFilterScheme;
    startDate: string;
    endDate: string;
}

export declare const dateToDatetimeInputStr: (date: Date) => string;

export declare const dateToInputStr: (date: Date) => string;

export declare type DisplayMode = "table" | "block";

export declare type EditableColFilterState = StringFilterState | NumberFilterState | DateFilterState;

export declare type EditableFilterState = Record<string, EditableColFilterState>;

export declare interface EditModel {
    getUpdateCallback: UpdateCallbackGenerator;
    getDeleteCallback?: (id: RowId) => () => void;
    editColWidth?: number;
}

export declare interface EndDateFilterState extends AbstractDateFilterState {
    scheme: "endAt";
    endDate: Date | null;
}

declare type ExportFn = (stage: Stage, fileType: FileType, formatted: boolean) => void;

declare interface ExportFnInfo {
    exportFn: ExportFn;
    formattersExist: boolean;
    filteringEnabled: boolean;
    paginationEnabled: boolean;
    rowCounts: {
        total: number;
        filtered?: number;
        currentPage?: number;
    };
}

declare interface ExportFormProps {
    exportFnInfo: ExportFnInfo;
    closeCallback: () => void;
    styleModel?: ExportFormStyleModel;
}

export declare interface ExportFormStyleModel {
    legend?: string[];
    radioContainer?: string[];
    radioInput?: string[];
    radioLabel?: string[];
    submitButton?: string[];
}

declare type FileType = "csv" | "json";

export declare type FilterFormRowState = StringFilterState | NumberFormFilterState | DateFormFilterState;

export declare type FilterFormState = Record<string, FilterFormRowState>;

export declare type FilterInputTableStyleModel = SharedTableStyleModel & {
    tbodyTr?: (rowIndex: number) => string[] | null;
    tbodyTd?: (rowIndex: number, colIndex: number) => string[] | null;
    enablementInput?: (rowIndex: number) => string[] | null;
    schemeSelectionInput?: (rowIndex: number) => string[] | null;
    searchStringInput?: (rowIndex: number) => string[] | null;
    numberInput?: (rowIndex: number) => string[] | null;
    startDateInput?: (rowIndex: number) => string[] | null;
    endDateInput?: (rowIndex: number) => string[] | null;
    submitButton?: string[];
    form?: string[];
};

export declare type FilterModel = ControlledFilterModel | UncontrolledFilterModel;

declare interface FilterOptionsTableProps {
    filterState: FilterState;
    setFilterState: (filterState: EditableFilterState) => void;
    closeFormCallback: () => void;
    caption?: string;
    styleModel?: FilterInputTableStyleModel;
}

export declare type FilterState = Record<string, ColFilterState>;

declare interface FocusCoordinates {
    ariaRowIndex: number;
    ariaColIndex: number;
}

export declare type FormattedExportRow = {
    id: RowId;
    data: Record<string, string | number>;
};

export declare type FormattedRow = {
    contents: Omit<CellData, "width">[];
} & Omit<PostPaginationRowDef, "data">;

export declare const getWidthStyle: (width: number | undefined) => CSSProperties | undefined;

export declare const Grid: FC<GridProps>;

export declare type GridBodyProps = {
    augFormattedRows: AugFormattedRow[];
    cols: GridProps["cols"];
    rowVariant?: GridProps["bodyRowVariant"];
    cellVariant?: GridProps["bodyCellVariant"];
    focusCoords: FocusCoordinates;
    cellFocusVariant?: GridProps["bodyCellFocusVariant"];
};

export declare type GridBorderSetting = "horizontal" | "full" | "none";

export declare interface GridHeaderProps {
    cols: GridProps["cols"];
    vertScrollable: boolean;
    rowVariant?: GridProps["headerRowVariant"];
    cellVariant?: GridProps["headerCellVariant"];
    focusColIndex: number | null;
    cellFocusVariant?: GridProps["headerCellFocusVariant"];
}

export declare type GridHeightSetting = number | "auto" | "parent";

export declare type GridProps = MainComponentSharedProps & {
    height?: GridHeightSetting;
    width?: GridWidthSetting;
    variant?: string;
    stripes?: GridStripeSetting;
    hover?: boolean;
    borders?: GridBorderSetting;
    borderVariant?: string;
    small?: boolean;
    divider?: boolean;
    headerRowVariant?: string;
    headerCellVariant?: HeaderCellVariantFn;
    bodyRowVariant?: (row: FormattedRow, displayIndex: number) => string | null;
    bodyCellVariant?: BodyCellVariantFn;
    headerCellFocusVariant?: HeaderCellVariantFn;
    bodyCellFocusVariant?: BodyCellVariantFn;
};

export declare type GridStripeSetting = "rows" | "columns" | "none";

export declare type GridWidthSetting = number | "auto" | "parent";

export declare type HeaderCellVariantFn = (col: ColDef, colIndex: number) => string | null;

export declare type InterfaceNodeGenerator = (closeUiCallback: () => void) => ToolbarInterfaces;

export declare interface InterfaceParams {
    filtering?: FilterOptionsTableProps;
    exporting?: ExportFormProps;
}

export declare type InterfacePropGenerator = (closeUiCallback: () => void) => InterfaceParams;

export declare const isSubset: <T>(subset: T[], superSet: T[]) => boolean;

export declare type JustifyContentSetting = "start" | "end" | "center" | "between" | "around" | "evenly";

export declare interface MainComponentSharedProps {
    rows: RowDef[];
    cols: ColDef[];
    pagination?: PaginationModel;
    sortModel?: SortModel;
    filterModel?: FilterModel;
    selectModel?: SelectModel;
    editModel?: EditModel;
    styleModel?: StyleModel;
    allowExport?: boolean;
}

export declare type MultiExistingSelection = "full" | "partial" | "none";

export declare interface MultiSelectionInfo {
    selectType: "multi";
    existingSelection: "full" | "partial" | "none";
}

export declare type MultiSelectModel = BaseSelectModel & {
    type: "multi";
    selected: RowId[];
    setSelected: (selected: RowId[]) => void;
};

export declare type NormalizedPaginationModel = Required<Omit<ControlledPaginationModel, "type" | "pageSelectorAriaLabel" | "pageSelectorJustifyContent">> & Pick<ControlledPaginationModel, "pageSelectorAriaLabel" | "pageSelectorJustifyContent">;

export declare type NormalizedTableFilterModel = Pick<ControlledFilterModel, "tableFilterState" | "setTableFilterState">;

export declare type NumberFilterScheme = (typeof numberFilterSchemes)[number];

export declare const numberFilterSchemeNames: Record<NumberFilterScheme, string>;

export declare const numberFilterSchemes: readonly ["equals", "greaterThan", "lessThan", "greaterOrEqual", "lessOrEqual"];

export declare interface NumberFilterState extends AbstractFilterState {
    type: "number";
    scheme: NumberFilterScheme;
    numValue: number | null;
}

export declare interface NumberFormFilterState extends AbstractFilterState {
    type: "number";
    scheme: NumberFilterScheme;
    inputValue: string;
}

export declare type PaginationModel = ControlledPaginationModel | UncontrolledPaginationModel;

export declare interface PaginationOptions {
    pageSizeOptions?: number[];
    maxPageButtons?: number;
    componentSize?: Size;
    pageSelectorAriaLabel?: string;
    pageSelectorJustifyContent?: JustifyContentSetting;
}

export declare type PostPaginationRowDef<Data extends ValidRowData = ValidRowData> = AugRowDef<Data> & {
    prePaginationIndex: number;
};

export declare type RowData<Data extends ValidRowData = ValidRowData> = Data;

export declare interface RowDef<Data extends ValidRowData = ValidRowData> {
    id: RowId;
    data: RowData<Data>;
}

export declare type RowId = string | number;

export declare type SelectionInfo = SingleSelectionInfo | MultiSelectionInfo;

export declare type SelectMode = "column" | "row" | "both";

export declare type SelectModel = SingleSelectModel | MultiSelectModel;

export declare type SelectType = "single" | "multi";

export declare interface SharedTableStyleModel {
    table?: string[];
    tbody?: string[];
    thead?: string[];
    theadTr?: string[];
    theadTh?: (colIndex: number) => string[] | null;
    caption?: string[];
}

export declare interface SingleSelectionInfo {
    selectType: "single";
    existingSelection: boolean;
}

export declare type SingleSelectModel = BaseSelectModel & {
    type: "single";
    selected: RowId | null;
    setSelected: (selected: RowId | null) => void;
    groupName?: string;
};

export declare type Size = "small" | "medium" | "large";

export declare interface SortColDef {
    name: string;
    order: SortOrder;
}

export declare type SortModel = ControlledSortModel | UncontrolledSortModel;

export declare type SortOrder = "asc" | "desc";

declare type Stage = "original" | "filtered" | "paged";

export declare interface StartDateFilterState extends AbstractDateFilterState {
    scheme: "startFrom";
    startDate: Date | null;
}

export declare type StringFilterScheme = (typeof stringFilterSchemes)[number];

export declare const stringFilterSchemeNames: Record<StringFilterScheme, string>;

export declare const stringFilterSchemes: readonly ["contains", "startsWith", "endsWith"];

export declare interface StringFilterState extends AbstractFilterState {
    type: "string";
    scheme: StringFilterScheme;
    searchString: string;
}

export declare interface StyleModel {
    mainTableStyleModel?: TableStyleModel;
    filterInputTableStyleModel?: FilterInputTableStyleModel;
    additionalComponentsStyleModel?: AdditionalComponentsStyleModel;
    toolbarStyleModel?: ToolbarStyleModel;
    exportFormStyleModel?: ExportFormStyleModel;
}

export declare const Table: FC<TableProps>;

export declare type TableProps = MainComponentSharedProps & {
    caption?: string;
    styleModel?: StyleModel;
    displayMode?: DisplayMode;
};

export declare type TableStyleModel = SharedTableStyleModel & {
    tbodyTr?: (rowId: RowId, displayIndex: number) => string[] | null;
    tbodyTd?: (rowId: RowId, displayRowIndex: number, colIndex: number) => string[] | null;
    tbodyTdInput?: (rowId: RowId, displayRowIndex: number, colIndex: number) => string[] | null;
    editColTh?: string[];
    editColTd?: (rowId: RowId, displayIndex: number) => string[] | null;
    editStartButton?: (rowId: RowId, displayIndex: number) => string[] | null;
    editDeleteButton?: (rowId: RowId, displayIndex: number) => string[] | null;
    editSaveButton?: (rowId: RowId, displayIndex: number) => string[] | null;
    editCancelButton?: (rowId: RowId, displayIndex: number) => string[] | null;
    rowSelectColTh?: string[];
    rowSelectColTd?: (rowId: RowId, displayIndex: number) => string[] | null;
    rowSelectInput?: (rowId: RowId, displayIndex: number) => string[] | null;
};

export declare type ToolbarInterfaces = Partial<Record<ToolbarOption, ReactNode>>;

export declare type ToolbarOption = "filtering" | "exporting";

export declare interface ToolbarStyleModel {
    activeButton?: string[];
    inactiveButton?: string[];
    toolbar?: string[];
    interfaceContainer?: string[];
}

export declare const trueModulo: (num: number, divisor: number) => number;

export declare type UncontrolledFilterModel = Partial<Pick<ControlledFilterModel, "tableFilterState" | "filterTableCaption">> & {
    type: "uncontrolled";
};

export declare type UncontrolledPaginationModel = PaginationOptions & {
    type: "uncontrolled";
    startingPageSizeIndex?: number;
    startingCurrentPage?: number;
};

export declare interface UncontrolledSortModel {
    type: "uncontrolled";
    initialSortColDef: SortColDef | null;
}

export declare type UpdateCallbackGenerator = (id: RowId) => (rowData: RowData) => void;

export declare const useControlledHover: <T>() => UseControlledHoverHook<T>;

declare interface UseControlledHoverHook<T> {
    isHovering: boolean;
    setIsHovering: (isHovering: boolean) => void;
    handleMouseOver: MouseEventHandler<T>;
    handleMouseOut: MouseEventHandler<T>;
}

export declare type ValidRowData = Record<string, any>;

export { }
