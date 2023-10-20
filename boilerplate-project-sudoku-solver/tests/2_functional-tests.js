const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite("solve", () => {
    test("return a solution with a valid puzzle", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        })
        .end((err, res) => {
          assert.equal(
            res.body,
            "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
          );
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
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37?",
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
});
