import "./Board.css";

const Board = ({ board }) => {
  let squareBG = ["white-square", "dark-square"];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.0.7/css/all.css"
      />

      <div className="box mt-2">
        <div className="container main-board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((col, colIndex) => {
                return (
                  <div
                    key={colIndex}
                    className={`square ${squareBG[col.background]}`}
                    id={`square-${rowIndex}-${colIndex}`}
                  >
                    {col.hasQueen && (
                      <div className="w-100 h-100 d-flex align-items-center">
                        <i class="fas fa-chess-queen text-danger fa-lg"></i>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;
