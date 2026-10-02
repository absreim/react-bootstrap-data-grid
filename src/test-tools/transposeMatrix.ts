const transposeMatrix: (matrix: number[][]) => number[][] = (matrix) => {
  const origNumRows = matrix.length;
  if (origNumRows === 0) {
    return [];
  }

  const origNumCols = matrix[0].length;
  const newRows = new Array(origNumCols).map((_) => new Array(origNumRows).map((_) => 0));
  for (let i = 0; i < origNumRows; i++) {
    for (let j = 0; j < origNumCols; j++) {
      newRows[j][i] = matrix[i][j];
    }
  }

  return newRows;
}

export default transposeMatrix;
