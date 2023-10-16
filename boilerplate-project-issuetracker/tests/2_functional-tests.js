const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("POST new issue", () => {
    test("POST /api/issues/apitest with every field", function (done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/issues/apitest")
        .send({
          issue_title: "test1",
          issue_text: "test1",
          created_by: "test1",
          assigned_to: "test1",
          status_text: "test1",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.strictEqual(res.body.issue_title, "test1");
          assert.strictEqual(res.body.issue_text, "test1");
          assert.strictEqual(res.body.created_by, "test1");
          assert.strictEqual(res.body.assigned_to, "test1");
          assert.strictEqual(res.body.status_text, "test1");
          assert.isTrue(res.body.open);
          done();
        });
    });

    test("POST /api/issues/apitest with only required fields", function (done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/issues/apitest")
        .send({
          issue_title: "test1",
          issue_text: "test1",
          created_by: "test1",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.strictEqual(res.body.issue_title, "test1");
          assert.strictEqual(res.body.issue_text, "test1");
          assert.strictEqual(res.body.created_by, "test1");
          assert.strictEqual(res.body.assigned_to, "");
          assert.strictEqual(res.body.status_text, "");
          assert.isTrue(res.body.open);
          done();
        });
    });

    test("POST /api/issues/apitest with missing required fields", function (done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/issues/apitest")
        .send({
          issue_title: "test1",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "required field(s) missing" });
          done();
        });
    });
  });

  suite("GET issue", () => {
    test("GET /api/issues/apitest", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/issues/apitest")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          console.log(res.body);
          res.body.forEach((e) => {
            assert.strictEqual(e.project, "apitest");
          });
          done();
        });
    });

    test("GET /api/issues/apitest?open=false", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/issues/apitest?open=false")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          res.body.forEach((e) => {
            assert.strictEqual(e.project, "apitest");
            assert.isFalse(e.open);
          });
          done();
        });
    });

    test("GET /api/issues/apitest?open=true&created_by=test1", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/issues/apitest?open=true&created_by=test1")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          res.body.forEach((e) => {
            assert.strictEqual(e.project, "apitest");
            assert.isTrue(e.open);
            assert.strictEqual(e.created_by, "test1");
          });
          done();
        });
    });
  });
});
