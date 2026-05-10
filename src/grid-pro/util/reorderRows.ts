import { RowDef, RowId, ValidRowData } from "../";

const reorderRows: <Data extends ValidRowData>(rows: RowDef<Data>[], id: RowId, destIndex: number) => RowDef<Data>[] = (rows, id, destIndex) => {
  const rowsCopy = rows.slice();
  const srcIndex = rowsCopy.findIndex((rowsCopy) => rowsCopy.id === id);
  const srcContents = rowsCopy[srcIndex];
  rowsCopy.splice(srcIndex, 1);

  if (destIndex === 0) {
    rowsCopy.splice(0, 0, srcContents);
    return rowsCopy;
  }

  if (srcIndex < destIndex) {
    rowsCopy.splice(destIndex - 1, 0, srcContents);
    return rowsCopy;
  }

  rowsCopy.splice(destIndex, 0, srcContents);
  return rowsCopy;
}

export default reorderRows;
