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

  checkRegionPlacement(puzzleString, row, column, value) {
    const puzzleArray = [];
    for (let i = 0; i < 9; i++) {
      puzzleArray.push(puzzleString.slice(9 * i, 9 * i + 9));
    }

    const regionArray = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        regionArray.push(
          puzzleArray[Math.floor(row / 3) * 3 + i][
            Math.floor(column / 3) * 3 + j
          ]
        );
      }
    }

    return !regionArray.includes(value.toString());
  }

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
