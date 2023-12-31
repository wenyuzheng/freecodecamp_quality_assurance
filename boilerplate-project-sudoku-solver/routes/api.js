"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  const solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    if (!puzzle || !coordinate || value === undefined)
      return res.json({ error: "Required field(s) missing" });

    const validation = solver.validate(puzzle);
    if (validation.hasOwnProperty("error")) {
      return res.json(validation);
    }

    const validCoord = /^([A-Ia-i])([1-9])$/;
    if (!validCoord.test(coordinate)) {
      return res.json({ error: "Invalid coordinate" });
    }
    const [_, row, col] = coordinate.match(validCoord);

    if (!/^[1-9]$/.test(value)) {
      return res.json({ error: "Invalid value" });
    }

    const alphabet = "ABCDEFGHI";
    const rowInNum = alphabet.indexOf(row.toUpperCase());
    const colInNum = col - 1;

    const conflict = [];
    if (!solver.checkRowPlacement(puzzle, rowInNum, colInNum, value))
      conflict.push("row");
    if (!solver.checkColPlacement(puzzle, rowInNum, colInNum, value))
      conflict.push("column");
    if (!solver.checkRegionPlacement(puzzle, rowInNum, colInNum, value))
      conflict.push("region");

    if (conflict.length !== 0) return res.json({ valid: false, conflict });
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
