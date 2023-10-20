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
        "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1";
      const result = solver.solve(puzzle);
      assert.equal(
        result,
        "218396745753284196496157832531672984649831257827549613962415378185763429374928561"
      );
    });

    test("invalid puzzle", () => {
      const puzzle =
        ".7.897....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6";
      const result = solver.solve(puzzle);
      assert.isFalse(result);
    });

    test("return solution for an incomplete puzzle", () => {
      const puzzle =
        "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3";
      const result = solver.solve(puzzle);
      assert.equal(
        result,
        "568913724342687519197254386685479231219538467734162895926345178473891652851726943"
      );
    });
  });
});
