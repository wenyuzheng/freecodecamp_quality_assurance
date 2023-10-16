"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

const express = require("express");

const app = express();

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.get("/api/convert", (req, res) => {
    const { input } = req.query;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.json("invalid number and unit");
    } else if (initNum === "invalid number") {
      return res.json("invalid number");
    } else if (initUnit === "invalid unit") {
      return res.json("invalid unit");
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    return res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
