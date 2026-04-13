import { ColDef, RowData, RowId } from "../types";
import { EditModel } from "../editing/types";
import inputStrsToRowData from "../editing/inputStrsToRowData";

export type UseGetInputStrSubmitCallbackHook =
  | ((id: RowId) => (inputStrs: string[]) => void)
  | undefined;

const useGetInputStrSubmitCallback: (
  editModel: EditModel | undefined,
  cols: ColDef[],
) => UseGetInputStrSubmitCallbackHook = (editModel, cols) => {
  const getInputStrSubmitCallback:
    | ((id: RowId) => (inputStrs: string[]) => void)
    | undefined =
    editModel &&
    ((id) => {
      const idSpecificCallback = editModel.getUpdateCallback(id);
      return (inputStrs: string[]) => {
        const rowData: RowData = inputStrsToRowData(cols, inputStrs);
        idSpecificCallback(rowData);
      };
    });

  return getInputStrSubmitCallback;
};

export default useGetInputStrSubmitCallback;
