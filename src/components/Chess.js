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
      for (let j = 0; j < boardSize; j++)
        row[j] = new Square(i, j);
      squares[i] = row;
    }
    setBoard(squares);
  }

  useEffect(resetBoard, []);

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

      {/* 
        // Input fields
        // - setSize
        // - Solve/ Play button
      */}

      <Board board={board} />

      <div className="play-again">
        <button className="btn btn-lg btn-success" onClick={playAgain}>
          Play again
        </button>
        <br />
        (uses randomized backtracking, to find another solution)
      </div>
    </>
  );
};

export default Chess;
