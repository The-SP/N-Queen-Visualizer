import { useEffect, useState } from "react";
import Square from "./Square";
import Board from "./Board";
import solvePuzzle from "./Algorithm";

const Chess = () => {
  const [board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState(8);
  const [animation_speed, setAnimationSpeed] = useState(50);

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

  function solveNQueen() {
    resetBoard();
    let solution = solvePuzzle(board)["finalBoard"];
    setBoard(solution);
  }

  function visulaize() {
    resetBoard();
    let results = solvePuzzle(board)["results"];
    for (let i = 0; i < results.length; i++) {
      setTimeout(() => {
        setBoard(results[i]);
      }, i * animation_speed);
    }
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">N-Queen</span>
        </div>
      </nav>

      <div className="d-flex justify-content-around align-items-center text-center">
        {/* Reset board */}
        <button className="btn btn-dark mx-auto" onClick={resetBoard}>
          Clear
        </button>

        {/* Animation Delay input */}
        <div className="form-control m-auto" style={{ maxWidth: 250 }}>
          <label htmlFor="customRange1" className="form-label">
            <span className="text-primary">Animation Delay: </span>
            <span className="font-weight-bold text-success">
              {`${animation_speed} ms`}
            </span>
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="1000"
            step="1"
            id="customRange1"
            value={animation_speed}
            onChange={(e) => setAnimationSpeed(e.target.value)}
          />
        </div>

        {/* Board size input */}
        <div className="form-control m-auto" style={{ maxWidth: 250 }}>
          <label htmlFor="customRange2" className="form-label">
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
            id="customRange2"
            value={boardSize}
            onChange={(e) => setBoardSize(e.target.value)}
          />
        </div>

        <button className="btn btn-success mx-auto" onClick={solveNQueen}>
          Solve
        </button>

        <button className="btn btn-dark mx-auto" onClick={visulaize}>
          Visualize
        </button>
      </div>

      <div className="mt-4">
        <Board board={board} />
      </div>
    </>
  );
};

export default Chess;
