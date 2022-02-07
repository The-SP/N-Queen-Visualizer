import { useEffect, useState } from "react";
import Square from "./Square";
import Board from "./Board";
import solvePuzzle from "./Algorithm";

const Chess = () => {
  const [board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState(8);
  const [animation_speed, setAnimationSpeed] = useState(50);
  const [solutions, setSolutions] = useState(null); // {results, animations}

  function resetBoard() {
    const squares = new Array(boardSize);
    for (let i = 0; i < boardSize; i++) {
      let row = new Array(boardSize);
      for (let j = 0; j < boardSize; j++) row[j] = new Square(i, j);
      squares[i] = row;
    }
    setBoard(squares);
    setSolutions(null); // erase previous solution each time resetBoard is called
  }

  useEffect(resetBoard, [boardSize]);

  function getRandomIndex(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  function solveNQueen() {
    let results = [];
    if (!solutions) {
      const resultsAndAnimations = solvePuzzle(board);
      setSolutions(resultsAndAnimations);

      results = resultsAndAnimations["results"];
      console.log("Possible Solutions:", results.length);
    } else {
      // if solution is already fetched
      results = solutions["results"];
    }
    let finalBoard;
    while (
      (finalBoard = results[getRandomIndex(results.length - 1)]) === board
    ); // generate different result every time
    setBoard(finalBoard);
  }

  function visulaize() {
    let animations = [];
    if (!solutions) {
      const resultsAndAnimations = solvePuzzle(board);
      setSolutions(resultsAndAnimations);

      animations = resultsAndAnimations["animations"];
      console.log("Solution fetched!");
    } else {
      // if solution is already fetched
      animations = solutions["animations"];
    }
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        setBoard(animations[i]);
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

      <div className="d-flex justify-content-around align-items-center text-center input-bar">
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
