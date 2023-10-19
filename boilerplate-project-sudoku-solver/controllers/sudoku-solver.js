class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length !== 81) return false;

    const regex = /^[0-9].*$/;
    const result = regex.test(puzzleString);
    return result;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowString = puzzleString.slice(row * 9, row * 9 + 9);
    return !rowString.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const colArray = [];
    for (let i = 0; i < 9; i++) {
      colArray.push(puzzleString[9 * i + column]);
    }
    return !colArray.includes(value.toString());
  }

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
