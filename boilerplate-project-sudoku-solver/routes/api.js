"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  const solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {});

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
