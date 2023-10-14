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

    test("Should read valid capital unit input - gal", () => {
      const result = convertHandler.getUnit("2.2Gal");
      const expected = "gal";
      assert.strictEqual(result, expected);
    });

    test("Should read valid capital unit input - L", () => {
      const result = convertHandler.getUnit("2.2l");
      const expected = "L";
      assert.strictEqual(result, expected);
    });

    test("Should read valid capital unit input - mi", () => {
      const result = convertHandler.getUnit("2.2mI");
      const expected = "mi";
      assert.strictEqual(result, expected);
    });

    test("Should read valid capital unit input - km", () => {
      const result = convertHandler.getUnit("2.2KM");
      const expected = "km";
      assert.strictEqual(result, expected);
    });

    test("Should read valid capital unit input - lbs", () => {
      const result = convertHandler.getUnit("2.2LBs");
      const expected = "lbs";
      assert.strictEqual(result, expected);
    });

    test("Should read valid capital unit input - kg", () => {
      const result = convertHandler.getUnit("2.2kG");
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

  suite("Convert", () => {
    test("Should convert number correctly - gal to L", () => {
      const result = convertHandler.convert(2, "gal");
      const expected = 7.57082;
      assert.strictEqual(result, expected);
    });

    test("Should convert number correctly - L to gal", () => {
      const result = convertHandler.convert(2, "L");
      const expected = 0.52834;
      assert.strictEqual(result, expected);
    });

    test("Should convert number correctly - mi to km", () => {
      const result = convertHandler.convert(2, "mi");
      const expected = 3.21868;
      assert.strictEqual(result, expected);
    });

    test("Should convert number correctly - km to mi", () => {
      const result = convertHandler.convert(2, "km");
      const expected = 1.24275;
      assert.strictEqual(result, expected);
    });

    test("Should convert number correctly - lbs to kg", () => {
      const result = convertHandler.convert(2, "lbs");
      const expected = 0.90718;
      assert.strictEqual(result, expected);
    });

    test("Should convert number correctly - kg to lbs", () => {
      const result = convertHandler.convert(2, "kg");
      const expected = 4.40925;
      assert.strictEqual(result, expected);
    });
  });

  suite("Get string", () => {
    test("Should return the correct string - gal to L", () => {
      const result = convertHandler.getString(2, "gal", 7.57082, "L");
      const expected = "2 gallons converts to 7.57082 liters";
      assert.strictEqual(result, expected);
    });

    test("Should return the correct string - L to gal", () => {
      const result = convertHandler.getString(2, "L", 0.52834, "gal");
      const expected = "2 liters converts to 0.52834 gallons";
      assert.strictEqual(result, expected);
    });

    test("Should return the correct string - mi to km", () => {
      const result = convertHandler.getString(2, "mi", 3.21868, "km");
      const expected = "2 miles converts to 3.21868 kilometers";
      assert.strictEqual(result, expected);
    });

    test("Should return the correct string - km to mi", () => {
      const result = convertHandler.getString(2, "km", 1.24275, "mi");
      const expected = "2 kilometers converts to 1.24275 miles";
      assert.strictEqual(result, expected);
    });

    test("Should return the correct string - lbs to kg", () => {
      const result = convertHandler.getString(2, "lbs", 0.90718, "kg");
      const expected = "2 pounds converts to 0.90718 kilograms";
      assert.strictEqual(result, expected);
    });

    test("Should return the correct string - kg to lbs", () => {
      const result = convertHandler.getString(2, "kg", 4.40925, "lbs");
      const expected = "2 kilograms converts to 4.40925 pounds";
      assert.strictEqual(result, expected);
    });
  });
});
