const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
const solver = new Solver();

suite("Unit Tests", () => {
  suite("validate", () => {
    test("has 81 valid characters", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.validate(puzzle);
      assert.isTrue(result);
    });

    test("has invalid characters", () => {
      const puzzle =
        "..5..2.84..63.12.7.2..5.....9..1.-..8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.validate(puzzle);
      assert.isFalse(result);
    });

    test("less than 81 characters in length", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1.?..8.2.3674.3.7.2..9.47...8..1..16....926914.37";
      const result = solver.validate(puzzle);
      assert.isFalse(result);
    });
  });

  suite("checkRowPlacement", () => {
    test("valid row placement", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.checkRowPlacement(puzzle, 0, 3);
      assert.isTrue(result);
    });

    test("invalid row placement", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.checkRowPlacement(puzzle, 0, 1);
      assert.isFalse(result);
    });
  });

  suite("checkColPlacement", () => {
    test("valid column placement", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.checkColPlacement(puzzle, 1, 3);
      assert.isTrue(result);
    });

    test("invalid column placement", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.checkColPlacement(puzzle, 3, 3);
      assert.isFalse(result);
    });
  });

  suite("checkRegionPlacement", () => {
    test("valid region placement", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.checkRegionPlacement(puzzle, 0, 1, 3);
      assert.isTrue(result);
    });

    test("invalid region placement", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.checkRegionPlacement(puzzle, 0, 1, 6);
      assert.isFalse(result);
    });
  });

  suite("isSafeToPlace", () => {
    test("valid placement", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.isSafeToPlace(puzzle, 0, 1, 3);
      assert.isTrue(result);
    });

    test("invalid placement", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.isSafeToPlace(puzzle, 0, 1, 6);
      assert.isFalse(result);
    });
  });

  suite("getPossibilities", () => {
    test("example 1", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.getPossibilities(puzzle, 0, 1);
      assert.deepEqual(result, [3]);
    });
  });

  suite("transform", () => {
    test("example 1", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.transform(puzzle);
      const expected = [
        [1, 0, 5, 0, 0, 2, 0, 8, 4],
        [0, 0, 6, 3, 0, 1, 2, 0, 7],
        [0, 2, 0, 0, 5, 0, 0, 0, 0],
        [0, 9, 0, 0, 1, 0, 0, 0, 0],
        [8, 0, 2, 0, 3, 6, 7, 4, 0],
        [3, 0, 7, 0, 2, 0, 0, 9, 0],
        [4, 7, 0, 0, 0, 8, 0, 0, 1],
        [0, 0, 1, 6, 0, 0, 0, 0, 9],
        [2, 6, 9, 1, 4, 0, 3, 7, 0],
      ];
      assert.deepEqual(result, expected);
    });
  });

  suite("solvePuzzle", () => {
    test("cannot solve", () => {
      const puzzle =
        ".7.897....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6";
      const puzzleMatrix = solver.transform(puzzle);
      const result = solver.solvePuzzle(puzzleMatrix);
      assert.isFalse(result);
    });

    test("can solve", () => {
      const puzzle =
        "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1";
      const puzzleMatrix = solver.transform(puzzle);
      const result = solver.solvePuzzle(puzzleMatrix);

      const expected = solver.transform(
        "218396745753284196496157832531672984649831257827549613962415378185763429374928561"
      );
      assert.deepEqual(result, expected);
    });
  });

  // suite("solve", () => {
  //   test("valid puzzle", () => {
  //     const puzzle =
  //       "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1";
  //     const result = solver.solve(puzzle);
  //     assert.equal(
  //       result,
  //       "218396745753284196496157832531672984649831257827549613962415378185763429374928561"
  //     );
  //   });

  // test("invalid puzzle", () => {
  //   const puzzle =
  //     ".7.897....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6";
  //   const result = solver.solve(puzzle);
  //   assert.isFalse(result);
  // });

  // test("return solution for an incomplete puzzle", () => {
  //   const puzzle =
  //     "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3";
  //   const result = solver.solve(puzzle);
  //   assert.equal(
  //     result,
  //     "568913724342687519197254386685479231219538467734162895926345178473891652851726943"
  //   );
  // });
  // });
});
