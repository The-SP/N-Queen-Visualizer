class Square {
    constructor(row, col) {
      this.row = row;
      this.col = col;
      this.background = (row+col)%2
      this.hasQueen = false;
      this.isActive = false;
      this.id = `${row}, ${col}`;
    }
  }

  export default Square;