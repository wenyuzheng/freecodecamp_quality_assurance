class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length !== 81) return false;

    const regex = /^[0-9].*$/;
    const result = regex.test(puzzleString);
    return result;
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
