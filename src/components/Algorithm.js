export default function solvePuzzle(board) {
  const N = board.length;
  const results = [];
  const animations = [];
  let isAnimationNeeded = true;

  function saveAnimation(i, j) {
    // board.slice() doesn't work on nested array becz slice method does not make deep copy.
    // It only copies the first layer of the array
    const temp = JSON.parse(JSON.stringify(board)); // create copy of board
    temp[i][j].isActive = true;
    animations.push(temp); // save animation
  }

  function isSafe(row, col) {
    let i, j;

    // Check this row on left side
    for (i = 0; i < col; i++) if (board[row][i].hasQueen) return false;

    // Check upper diagonal on left side
    for (i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
      if (board[i][j].hasQueen) return false;

    // Check lower diagonal on left side
    for (i = row + 1, j = col - 1; j >= 0 && i < N; i++, j--)
      if (board[i][j].hasQueen) return false;

    return true;
  }

  function placeQueen(col) {
    // Base case: All queens are placed
    if (col >= N) {
      const solutionBoard = JSON.parse(JSON.stringify(board));
      results.push(solutionBoard); // push this solution and search for another solution
      if (isAnimationNeeded) {
        animations.push(solutionBoard.slice()); // push final result;
        isAnimationNeeded = false; // save animation only for one solution
      }
      return true;
    }

    let res = false;
    // Consider this col and try to place this queen in all row one by one
    for (let i = 0; i < N; i++) {
      let row = i;
      if (isAnimationNeeded) saveAnimation(row, col);
      // Check if queen can be placed on board[i][col];
      if (isSafe(row, col)) {
        board[row][col].hasQueen = true; // Place queen;

        if (isAnimationNeeded) saveAnimation(row, col);

        // Recursion to place rest of queens
        res = placeQueen(col + 1);

        // if placing queen in board[i][col] does't lead to solution, then remove queen from board[i][col]
        board[row][col].hasQueen = false;
      }
    }

    // If queen can't be placed
    return res;
  }
  if (placeQueen(0)) { // But, here we are printing all solutions so final return will be false
    console.log("Soln found!!");
  }
  return { results, animations };
}
