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
      const expected = "invalid number";
      assert.strictEqual(result, expected);
    });

    test("Should return 1 when no numerical input", () => {
      const result = convertHandler.getNum("km");
      const expected = 1;
      assert.strictEqual(result, expected);
    });

    test("Should return an error on an invalid number", () => {
      const result = convertHandler.getNum("2.1.2km");
      const expected = "invalid number";
      assert.strictEqual(result, expected);
    });
  });

  suite("Read unit input", () => {
    test("Should read valid unit input - gal", () => {
      const result = convertHandler.getUnit("2.2gal");
      const expected = "gal";
      assert.strictEqual(result, expected);
    });

    test("Should read valid unit input - L", () => {
      const result = convertHandler.getUnit("2.2L");
      const expected = "L";
      assert.strictEqual(result, expected);
    });

    test("Should read valid unit input - mi", () => {
      const result = convertHandler.getUnit("2.2mi");
      const expected = "mi";
      assert.strictEqual(result, expected);
    });

    test("Should read valid unit input - km", () => {
      const result = convertHandler.getUnit("2.2km");
      const expected = "km";
      assert.strictEqual(result, expected);
    });

    test("Should read valid unit input - lbs", () => {
      const result = convertHandler.getUnit("2.2lbs");
      const expected = "lbs";
      assert.strictEqual(result, expected);
    });

    test("Should read valid unit input - kg", () => {
      const result = convertHandler.getUnit("2.2kg");
      const expected = "kg";
      assert.strictEqual(result, expected);
    });

    test("Should return error for invalid input unit", () => {
      const result = convertHandler.getUnit("2.2kilometer");
      const expected = "invalid unit";
      assert.strictEqual(result, expected);
    });
  });

  suite("Return unit", () => {
    test("Should return correct unit - gal", () => {
      const result = convertHandler.getReturnUnit("gal");
      const expected = "L";
      assert.strictEqual(result, expected);
    });

    test("Should return correct unit - L", () => {
      const result = convertHandler.getReturnUnit("L");
      const expected = "gal";
      assert.strictEqual(result, expected);
    });

    test("Should return correct unit - mi", () => {
      const result = convertHandler.getReturnUnit("mi");
      const expected = "km";
      assert.strictEqual(result, expected);
    });

    test("Should return correct unit - km", () => {
      const result = convertHandler.getReturnUnit("km");
      const expected = "mi";
      assert.strictEqual(result, expected);
    });

    test("Should return correct unit - lbs", () => {
      const result = convertHandler.getReturnUnit("lbs");
      const expected = "kg";
      assert.strictEqual(result, expected);
    });

    test("Should return correct unit - kg", () => {
      const result = convertHandler.getReturnUnit("kg");
      const expected = "lbs";
      assert.strictEqual(result, expected);
    });
  });

  suite("Return spell-out unit", () => {
    test("Should return correct spell-out unit - gal", () => {
      const result = convertHandler.spellOutUnit("gal");
      const expected = "gallons";
      assert.strictEqual(result, expected);
    });

    test("Should return correct spell-out unit - L", () => {
      const result = convertHandler.spellOutUnit("L");
      const expected = "liters";
      assert.strictEqual(result, expected);
    });

    test("Should return correct spell-out unit - mi", () => {
      const result = convertHandler.spellOutUnit("mi");
      const expected = "miles";
      assert.strictEqual(result, expected);
    });

    test("Should return correct spell-out unit - km", () => {
      const result = convertHandler.spellOutUnit("km");
      const expected = "kilometers";
      assert.strictEqual(result, expected);
    });

    test("Should return correct spell-out unit - lbs", () => {
      const result = convertHandler.spellOutUnit("lbs");
      const expected = "pounds";
      assert.strictEqual(result, expected);
    });

    test("Should return correct spell-out unit - kg", () => {
      const result = convertHandler.spellOutUnit("kg");
      const expected = "kilograms";
      assert.strictEqual(result, expected);
    });
  });
});
