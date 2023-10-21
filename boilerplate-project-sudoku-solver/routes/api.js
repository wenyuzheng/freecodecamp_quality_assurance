"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  const solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    if (!puzzle || !coordinate || value === null)
      return res.json({ error: "Required field(s) missing" });

    const validation = solver.validate(puzzle);
    if (validation.hasOwnProperty("error")) {
      return res.json(validation);
    }

    const [row, col] = coordinate.split("");
    const invalidRow =
      !row || row.toUpperCase() < "A" || row.toUpperCase() >= "I";
    const invalidCol = !col || col <= 0 || col > 9;

    if (invalidRow || invalidCol) {
      return res.json({ error: "Invalid coordinate" });
    }

    if (value <= 0 || value > 9) {
      return res.json({ error: "Invalid value" });
    }

    const alphabet = "ABCDEFGHI";
    const rowInNum = alphabet.indexOf(row);
    const colInNum = col - 1;

    const conflicts = [];

    if (!solver.checkRowPlacement(puzzle, rowInNum, value))
      conflicts.push("row");
    if (!solver.checkColPlacement(puzzle, colInNum, value))
      conflicts.push("column");
    if (!solver.checkRegionPlacement(puzzle, rowInNum, colInNum, value))
      conflicts.push("region");

    console.log({ conflicts });

    if (conflicts.length !== 0) return res.json({ valid: false, conflicts });

    return res.json({ valid: true });
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;

    if (!puzzle) return res.json({ error: "Required field missing" });

    const validation = solver.validate(puzzle);
    if (validation.hasOwnProperty("error")) {
      return res.json(validation);
    }

    const result = solver.solve(puzzle);
    if (!result) return res.json({ error: "Puzzle cannot be solved" });

    return res.json({ solution: result });
  });
};
