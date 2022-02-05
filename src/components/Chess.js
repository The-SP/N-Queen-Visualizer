import { useEffect, useState } from "react";
import Square from "./Square";
import Board from "./Board";
import solvePuzzle from "./Algorithm";

const Chess = () => {
  const [board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState(8);

  function resetBoard() {
    const squares = new Array(boardSize);
    for (let i = 0; i < boardSize; i++) {
      let row = new Array(boardSize);
      for (let j = 0; j < boardSize; j++) row[j] = new Square(i, j);
      squares[i] = row;
    }
    setBoard(squares);
  }

  useEffect(resetBoard, [boardSize]);

  function playAgain() {
    resetBoard();
    let solution = solvePuzzle(board);
    setBoard(solution);
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">N-Queen</span>
        </div>
      </nav>

      <div className="mt-1 text-center">
        {/* Board size input */}
        <div className="form-control m-auto" style={{ maxWidth: 300 }}>
          <label htmlFor="customRange3" className="form-label">
            <span className="text-primary">Size of Board: </span>
            <span className="font-weight-bold text-success">
              {`${boardSize} x ${boardSize}`}
            </span>
          </label>
          <input
            type="range"
            className="form-range"
            min="4"
            max="12"
            step="1"
            id="customRange3"
            value={boardSize}
            onChange={(e) => setBoardSize(e.target.value)}
          />
        </div>
        {/* End of size input */}

        <button className="btn btn-success mt-1" onClick={playAgain}>
          Solve
        </button>
      </div>

      <Board board={board} />
    </>
  );
};

export default Chess;
