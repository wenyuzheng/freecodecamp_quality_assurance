class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length !== 81)
      return { error: "Expected puzzle to be 81 characters long" };

    const regex = /^[0-9.]*$/;
    const result = regex.test(puzzleString);
    if (!result) {
      return { error: "Invalid characters in puzzle" };
    }
    return result;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowString = puzzleString.slice(row * 9, row * 9 + 9);
    if (rowString[column] === value.toString()) return true;
    return !rowString.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const colArray = [];
    for (let i = 0; i < 9; i++) {
      colArray.push(puzzleString[9 * i + column]);
    }

    if (colArray[row] === value.toString()) return true;
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

    if (regionArray[row * 3 + column] === value.toString()) return true;
    return !regionArray.includes(value.toString());
  }

  isSafeToPlace(puzzleString, row, column, value) {
    return (
      this.checkRowPlacement(puzzleString, row, column, value) &&
      this.checkColPlacement(puzzleString, row, column, value) &&
      this.checkRegionPlacement(puzzleString, row, column, value)
    );
  }

  getPossibilities(puzzleString, row, column) {
    const possibilities = [];
    for (let i = 1; i <= 9; i++) {
      if (this.isSafeToPlace(puzzleString, row, column, i))
        possibilities.push(i);
    }
    return possibilities;
  }

  transform(puzzleString) {
    const puzzleMatrix = [];
    for (let i = 0; i < 9; i++) {
      const rowArray = puzzleString
        .slice(9 * i, 9 * i + 9)
        .split("")
        .map((e) => (e === "." ? 0 : parseInt(e)));
      puzzleMatrix.push(rowArray);
    }
    return puzzleMatrix;
  }

  getNextEmpty(puzzleMatrix) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (puzzleMatrix[i][j] === 0) return [i, j];
      }
    }
    return false;
  }

  solvePuzzle(puzzleMatrix) {
    const nextEmpty = this.getNextEmpty(puzzleMatrix);
    if (!nextEmpty) return puzzleMatrix;
    const [i, j] = nextEmpty;

    const puzzleString = puzzleMatrix.map((e) => e.join("")).join("");
    const possibilities = this.getPossibilities(puzzleString, i, j);

    for (let k = 0; k < possibilities.length; k++) {
      puzzleMatrix[i][j] = possibilities[k];

      const result = this.solvePuzzle(puzzleMatrix);
      if (result) {
        return result;
      } else {
        puzzleMatrix[i][j] = 0;
      }
    }
    return false;
  }

  solve(puzzleString) {
    const puzzleMatrix = this.transform(puzzleString);
    const solved = this.solvePuzzle(puzzleMatrix);
    if (!solved) {
      return false;
    }
    return solved.map((e) => e.join("")).join("");
  }
}

module.exports = SudokuSolver;
