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
      const result = solver.checkRowPlacement(puzzle, 0, 1, 3);
      assert.isTrue(result);
    });

    test("invalid row placement", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.checkRowPlacement(puzzle, 0, 1, 1);
      assert.isFalse(result);
    });
  });

  suite("checkColPlacement", () => {
    test("valid column placement", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.checkColPlacement(puzzle, 0, 1, 3);
      assert.isTrue(result);
    });

    test("invalid column placement", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const result = solver.checkColPlacement(puzzle, 0, 3, 3);
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

  suite("solve", () => {
    test("valid puzzle", () => {
      const puzzle =
        "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
      const result = solver.solve(puzzle);
      assert.isTrue(result);
    });

    test("invalid puzzle", () => {
      const puzzle =
        ".7.897....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6";
      const result = solver.solve(puzzle);
      assert.isFalse(result);
    });
  });
});
