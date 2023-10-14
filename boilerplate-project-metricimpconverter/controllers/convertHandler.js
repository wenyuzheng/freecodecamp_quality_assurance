function ConvertHandler() {
  this.getNum = function (input) {
    const index = input.match(/[a-zA-Z]/).index;
    const digits = input.slice(0, index);

    if (digits === "") {
      return 1;
    }

    if (/\/.*\//.test(digits)) {
      return "invalid number";
    }

    if (digits.includes("/")) {
      const [part1, part2] = digits.split("/").map((e) => Number(e));
      return part1 / part2;
    }

    if (isNaN(Number(digits))) {
      return "invalid number";
    }

    return Number(digits);
  };

  this.getUnit = function (input) {
    const index = input.match(/[a-zA-Z]/).index;
    const unit = input.slice(index, input.length);

    const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];

    if (validUnits.includes(unit)) {
      return unit;
    } else {
      return "invalid unit";
    }
  };

  this.getReturnUnit = function (initUnit) {
    const unitPairs = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };

    return unitPairs[initUnit];
  };

  this.spellOutUnit = function (unit) {
    let result;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };
}

module.exports = ConvertHandler;
