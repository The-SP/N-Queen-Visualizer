export default function solvePuzzle(board) {
  const N = board.length;

  function isSafe(row, col) {
    let i, j;

    // Check this row on left side
    for (i = 0; i < col; i++) if (board[row][i].hasQueen) return false;

    // Check upper diagonal on left side
    for (i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j].hasQueen) {
        return false;
      }
    }

    // Check lower diagonal on right side
    for (i = row + 1, j = col - 1; j >= 0 && i < N; i++, j--)
      if (board[i][j].hasQueen) return false;

    return true;
  }

  function placeQueen(col) {
    // Base case: All queens are placed
    if (col >= N) return true;

    // Consider this col and try to place this queen in all row one by one
    for (let i = 0; i < N; i++) {
    //   let row = options[i];
    let row = i;
      // Check if queen can be placed on board[i][col];
      if (isSafe(row, col)) {
        board[row][col].hasQueen = true; // Place queen;
        console.log("Queen placed in", row, col);

        // Recursion to place rest of queens
        if (placeQueen(col + 1)) return true;

        // if placing queen in board[i][col] does't lead to solution, then remove queen from board[i][col]
        board[row][col].hasQueen = false;
      }
    }

    // If queen can't be placed
    return false;
  }
  if (placeQueen(0)) {
    console.log("Soln found!!");
  }
  return board.slice();
}
