const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver;

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
        "1.5..2.84..63.12.7.2..5.....9..1.?..8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
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
});