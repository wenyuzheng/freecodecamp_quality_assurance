class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length !== 81) return false;

    const regex = /^[0-9].*$/;
    const result = regex.test(puzzleString);
    return result;
  }

  checkRowPlacement(puzzleString, row, value) {
    const rowString = puzzleString.slice(row * 9, row * 9 + 9);
    return !rowString.includes(value);
  }

  checkColPlacement(puzzleString, column, value) {
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

  isSafeToPlace(puzzleString, row, column, value) {
    return (
      this.checkRowPlacement(puzzleString, row, value) &&
      this.checkColPlacement(puzzleString, column, value) &&
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

  // solvePuzzle(puzzleString) {
  //   const puzzleMatrix = transform(puzzleString);

  //   for (let i = 0; i < 9; i++) {
  //     for (let j = 0; j < 9; j++) {
  //       if (puzzleMatrix[i][j] === 0) {
  //         const possibilities = this.getPossibilities(puzzleString, i, j);
  //         if (possibilities.length === 0) return false;

  //         for (let k = 0; k < possibilities.length; k++) {
  //           const val = possibilities[k];

  //           const updatedPuzzle = [...puzzleMatrix];
  //           updatedPuzzle[i][j] = val;

  //         }
  //       }
  //     }
  //   }
  // }

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
    // if (possibilities.length === 0) return false;

    for (let k = 0; k < possibilities.length; k++) {
      const val = possibilities[k];

      const updatedPuzzle = [...puzzleMatrix];
      updatedPuzzle[i][j] = val;

      const result = this.solvePuzzle(updatedPuzzle);

      if (result) {
        return result;
      }
    }
    return false;
  }

  solve(puzzleString) {
    const puzzleMatrix = this.transform(puzzleString);

    const solved = this.solvePuzzle(puzzleMatrix);

    console.log({ solved });

    if (!solved) {
      return false;
    }

    return solution;
  }
}

module.exports = SudokuSolver;
