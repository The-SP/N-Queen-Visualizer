import "./Board.css";

const Board = ({ board }) => {
  let squareBG = ["lavenderblush", "seagreen"];

  const squareSizeStyle = {
    width: 400 / board.length,
    height: 400 / board.length,
  };
  const queenSizeStyle = {
    fontSize: 250 / board.length,
  };

  function getColor(square) {
    // queen placed animation
    if (square.isActive && square.hasQueen) return "dodgerblue";
    // traverse possible queen positions
    else if (square.isActive) return "orange";
    else return squareBG[square.background];
  }

  return (
    <div className="container main-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((col, colIndex) => {
            return (
              <div
                key={colIndex}
                style={{ ...squareSizeStyle, backgroundColor: getColor(col) }}
                className="square"
                id={`square-${rowIndex}-${colIndex}`}
              >
                {col.hasQueen && (
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                    <i
                      style={queenSizeStyle}
                      class="fas fa-chess-queen text-danger"
                    ></i>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
