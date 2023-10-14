const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Read number input", () => {
    test("Should read a whole number input", () => {
      const result = convertHandler.getNum("2km");
      const expected = 2;
      assert.strictEqual(result, expected);
    });

    test("Should read a decimal number input", () => {
      const result = convertHandler.getNum("2.1km");
      const expected = 2.1;
      assert.strictEqual(result, expected);
    });

    test("Should read a fractional number input", () => {
      const result = convertHandler.getNum("3/2km");
      const expected = 1.5;
      assert.strictEqual(result, expected);
    });

    test("Should read a fractional number input with a decimal", () => {
      const result = convertHandler.getNum("3.2/5km");
      const expected = 0.64;
      assert.strictEqual(result, expected);
    });

    test("Should return an error on a double-fraction", () => {
      const result = convertHandler.getNum("3/2/3km");
      const expected = "Invalid number";
      assert.strictEqual(result, expected);
    });

    test("Should return 1 when no numerical input", () => {
      const result = convertHandler.getNum("km");
      const expected = 1;
      assert.strictEqual(result, expected);
    });

    test("Should return an error on an invalid number", () => {
      const result = convertHandler.getNum("2.1.2km");
      const expected = "Invalid number";
      assert.strictEqual(result, expected);
    });
  });
});
