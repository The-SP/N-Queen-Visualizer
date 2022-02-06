import "./Board.css";

const Board = ({ board }) => {
  let squareBG = ["seagreen", "lavenderblush"];

  const squareSizeStyle = {
    width: 400 / board.length,
    height: 400 / board.length,
  };

  function getColor(square) {
    if (square.isActive && square.hasQueen) return "dodgerblue";
    // queen placed animation
    else if (square.isActive) return "yellow";
    // traverse possible queen positions
    else return squareBG[square.background];
  }

  const queenSizeStyle = {
    fontSize: 250 / board.length,
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.0.7/css/all.css"
      />

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
    </>
  );
};

export default Board;
