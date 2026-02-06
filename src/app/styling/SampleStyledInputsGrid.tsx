import Grid, {
  ColDef,
  EditableTableFilterState,
  EditModel,
  FilterModel,
  RowDef,
  StyleModel,
  UpdateCallbackGenerator,
} from "@/grid";
import { FC, MouseEventHandler, useCallback, useMemo, useState } from "react";

const cols: ColDef[] = [
  {
    type: "string",
    name: "name",
    label: "Name",
  },
  {
    type: "number",
    name: "timesAttended",
    label: "Times Attended",
  },
  {
    type: "date",
    name: "recruitmentDate",
    label: "Recruitment Date",
  },
];

const initRows: RowDef[] = [
  {
    name: "Commander Shepard",
    timesAttended: 100,
    recruitmentDate: new Date("2183-01-01"),
  },
  {
    name: "Kaidan Alenko",
    timesAttended: 25,
    recruitmentDate: new Date("2183-01-02"),
  },
  {
    name: "Ashley Williams",
    timesAttended: 20,
    recruitmentDate: new Date("2183-01-10"),
  },
  {
    name: "Garrus Vakarian",
    timesAttended: 15,
    recruitmentDate: new Date("2183-02-01"),
  },
  {
    name: "Tali'Zorah nar Rayya",
    timesAttended: 12,
    recruitmentDate: new Date("2183-03-15"),
  },
  {
    name: "Urdnot Wrex",
    timesAttended: 10,
    recruitmentDate: new Date("2183-03-20"),
  },
  {
    name: "Liara T'soni",
    timesAttended: 8,
    recruitmentDate: new Date("2183-06-21"),
  },
];

const caption = "Normandy SR-1 Insiders";

const styleModel: StyleModel = {
  mainTableStyleModel: {
    table: ["table-striped"],
    tbodyTdInput: () => ["form-control-sm"],
    editDeleteButton: () => ["btn-danger"],
    editSaveButton: () => ["btn-success"],
    editCancelButton: () => ["btn-warning"],
  },
  additionalComponentsStyleModel: {
    topLevelDiv: ["vstack flex-column-reverse border"],
    filterInputsDiv: ["vstack flex-column-reverse align-items-start border m-2 p-2 gap-2"],
    tableAndPaginationDiv: ["vstack flex-column-reverse border m-2 p-2"],
    filterUiToggleButton: ["btn-info"],
  },
  filterInputTableStyleModel: {
    table: ["table-striped-columns"],
    startDateInput: () => ["form-control-sm"],
    endDateInput: () => ["form-control-sm"],
    submitButton: ["btn-success"],
  },
};

const SampleStyledInputsGrid: FC = () => {
  const [rows, setRows] = useState<RowDef[]>(initRows);
  const [tableFilterState, setTableFilterState] =
    useState<EditableTableFilterState>({
      name: {
        type: "string",
        scheme: "contains",
        searchString: "",
        enabled: false,
      },
      timesAttended: {
        type: "number",
        scheme: "greaterOrEqual",
        numValue: null,
        enabled: false,
      },
      recruitmentDate: {
        type: "date",
        scheme: "between",
        startDate: null,
        endDate: null,
        enabled: false,
      },
    });

  const filterModel: FilterModel = useMemo(
    () => ({
      tableFilterState,
      setTableFilterState,
    }),
    [tableFilterState],
  );

  const getUpdateCallback: UpdateCallbackGenerator = useCallback(
    (origIndex) => (rowDef) => {
      setRows((rows) => {
        const newRows = rows.slice();
        newRows[origIndex] = rowDef;
        return newRows;
      });
    },
    [],
  );
  const getDeleteCallback: (origIndex: number) => () => void = useCallback(
    (origIndex) => () => {
      setRows((rows) => rows.toSpliced(origIndex, 1));
    },
    [],
  );

  const editModel: EditModel = { getUpdateCallback, getDeleteCallback };
  const handleReset: MouseEventHandler<HTMLButtonElement> = () => {
    setRows(initRows);
  }

  return (
    <div className="vstack gap-2 align-items-start border p-2">
      <Grid
        rows={rows}
        cols={cols}
        caption={caption}
        filterModel={filterModel}
        editModel={editModel}
        styleModel={styleModel}
      />
      <button className="btn btn-secondary btn-sm" onClick={handleReset}>
        Reset Rows
      </button>
    </div>
  );
};

export default SampleStyledInputsGrid;
