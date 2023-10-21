const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite("/api/solve", () => {
    test("return a solution with a valid puzzle", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            solution:
              "135762984946381257728459613694517832812936745357824196473298561581673429269145378",
          });
          done();
        });
    });

    test("return an error with missing puzzle field", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({})
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Required field missing" });
          done();
        });
    });

    test("return an error with invalid characters", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle:
            "..5....84..63.12...2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37-",
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Invalid characters in puzzle" });
          done();
        });
    });

    test("return an error with incorrect length", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37",
        })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            error: "Expected puzzle to be 81 characters long",
          });
          done();
        });
    });

    test("return an error with cannot solved puzzle", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle:
            "115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Puzzle cannot be solved" });
          done();
        });
    });
  });

  suite("/api/check", () => {
    test("valid placement", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "A2",
          value: 3,
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { valid: true });
          done();
        });
    });

    test("invalid placement - conflict in row", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "A2",
          value: 4,
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { valid: false, conflict: ["row"] });
          done();
        });
    });

    test("invalid placement - conflict in column", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "A2",
          value: 9,
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { valid: false, conflict: ["column"] });
          done();
        });
    });

    test("invalid placement - conflict in row, column, region", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "A4",
          value: 1,
        })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            valid: false,
            conflict: ["row", "column", "region"],
          });
          done();
        });
    });

    test("valid placement on occupied place", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "A1",
          value: 1,
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { valid: true });
          done();
        });
    });

    test("return an error with missing puzzle field", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({})
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Required field(s) missing" });
          done();
        });
    });

    test("return an error with invalid characters", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "..5....84..63.12...2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37-",
          coordinate: "A1",
          value: 1,
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Invalid characters in puzzle" });
          done();
        });
    });

    test("return an error with incorrect length", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37",
          coordinate: "A1",
          value: 1,
        })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            error: "Expected puzzle to be 81 characters long",
          });
          done();
        });
    });

    test("return an error with incorrect input coordinate eg1", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "A0",
          value: 0,
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Invalid coordinate" });
          done();
        });
    });

    test("return an error with incorrect input coordinate eg2", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "A",
          value: 0,
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Invalid coordinate" });
          done();
        });
    });

    test("return an error with incorrect input coordinate eg3", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "K1",
          value: 0,
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Invalid coordinate" });
          done();
        });
    });

    test("return an error with incorrect input number", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "A1",
          value: 0,
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Invalid value" });
          done();
        });
    });
  });
});
