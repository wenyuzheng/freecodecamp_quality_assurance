const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  //   suite("POST new issue", () => {
  //     test("POST /api/issues/apitest with every field", function (done) {
  //       chai
  //         .request(server)
  //         .keepOpen()
  //         .post("/api/issues/apitest")
  //         .send({
  //           issue_title: "test1",
  //           issue_text: "test1",
  //           created_by: "test1",
  //           assigned_to: "test1",
  //           status_text: "test1",
  //         })
  //         .end(function (err, res) {
  //           assert.equal(res.status, 200);
  //           assert.strictEqual(res.body.issue_title, "test1");
  //           assert.strictEqual(res.body.issue_text, "test1");
  //           assert.strictEqual(res.body.created_by, "test1");
  //           assert.strictEqual(res.body.assigned_to, "test1");
  //           assert.strictEqual(res.body.status_text, "test1");
  //           assert.isTrue(res.body.open);
  //           done();
  //         });
  //     });

  //     test("POST /api/issues/apitest with only required fields", function (done) {
  //       chai
  //         .request(server)
  //         .keepOpen()
  //         .post("/api/issues/apitest")
  //         .send({
  //           issue_title: "test1",
  //           issue_text: "test1",
  //           created_by: "test1",
  //         })
  //         .end(function (err, res) {
  //           assert.equal(res.status, 200);
  //           assert.strictEqual(res.body.issue_title, "test1");
  //           assert.strictEqual(res.body.issue_text, "test1");
  //           assert.strictEqual(res.body.created_by, "test1");
  //           assert.strictEqual(res.body.assigned_to, "");
  //           assert.strictEqual(res.body.status_text, "");
  //           assert.isTrue(res.body.open);
  //           done();
  //         });
  //     });

  //     test("POST /api/issues/apitest with missing required fields", function (done) {
  //       chai
  //         .request(server)
  //         .keepOpen()
  //         .post("/api/issues/apitest")
  //         .send({
  //           issue_title: "test1",
  //         })
  //         .end(function (err, res) {
  //           assert.equal(res.status, 200);
  //           assert.deepEqual(res.body, { error: "required field(s) missing" });
  //           done();
  //         });
  //     });
  //   });

  //   suite("GET issue", () => {
  //     test("GET /api/issues/apitest", function (done) {
  //       chai
  //         .request(server)
  //         .keepOpen()
  //         .get("/api/issues/apitest")
  //         .end(function (err, res) {
  //           assert.equal(res.status, 200);
  //           assert.isArray(res.body);
  //           res.body.forEach((e) => {
  //             assert.strictEqual(e.project, "apitest");
  //           });
  //           done();
  //         });
  //     });

  //     test("GET /api/issues/apitest?open=false", function (done) {
  //       chai
  //         .request(server)
  //         .keepOpen()
  //         .get("/api/issues/apitest?open=false")
  //         .end(function (err, res) {
  //           assert.equal(res.status, 200);
  //           assert.isArray(res.body);
  //           res.body.forEach((e) => {
  //             assert.strictEqual(e.project, "apitest");
  //             assert.isFalse(e.open);
  //           });
  //           done();
  //         });
  //     });

  //     test("GET /api/issues/apitest?open=true&created_by=test1", function (done) {
  //       chai
  //         .request(server)
  //         .keepOpen()
  //         .get("/api/issues/apitest?open=true&created_by=test1")
  //         .end(function (err, res) {
  //           assert.equal(res.status, 200);
  //           assert.isArray(res.body);
  //           res.body.forEach((e) => {
  //             assert.strictEqual(e.project, "apitest");
  //             assert.isTrue(e.open);
  //             assert.strictEqual(e.created_by, "test1");
  //           });
  //           done();
  //         });
  //     });
  //   });

  suite("PUT issue", () => {
    test("PUT /api/issues/apitest to update one field", function (done) {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/apitest")
        .send({ _id: "652d1aad79781193d4fcb54d", issue_title: "test2" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {
            result: "successfully updated",
            _id: "652d1aad79781193d4fcb54d",
          });
          done();
        });
    });

    test("PUT /api/issues/apitest to update multiple fields", function (done) {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/apitest")
        .send({
          _id: "652d1aad79781193d4fcb54d",
          issue_text: "test2",
          open: false,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {
            result: "successfully updated",
            _id: "652d1aad79781193d4fcb54d",
          });
          done();
        });
    });

    test("PUT /api/issues/apitest with missing _id", function (done) {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/apitest")
        .send({})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "missing _id" });
          done();
        });
    });

    test("PUT /api/issues/apitest with no fields to update", function (done) {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/apitest")
        .send({ _id: "652d1aad79781193d4fcb54d" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {
            error: "no update field(s) sent",
            _id: "652d1aad79781193d4fcb54d",
          });
          done();
        });
    });

    test("PUT /api/issues/apitest with invalid _id", function (done) {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/apitest")
        .send({ _id: "1", issue_text: "test2" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "could not update", _id: "1" });
          done();
        });
    });
  });

  suite("DELETE issue", () => {
    test("DELETE /api/issues/apitest", function (done) {
      chai
        .request(server)
        .keepOpen()
        .delete("/api/issues/apitest")
        .send({ _id: "652d1acdeb24b2526449b085" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {
            result: "successfully deleted",
            _id: "652d1acdeb24b2526449b085",
          });
          done();
        });
    });

    test("DELETE /api/issues/apitest", function (done) {
      chai
        .request(server)
        .keepOpen()
        .delete("/api/issues/apitest")
        .send({})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "missing _id" });
          done();
        });
    });

    test("DELETE /api/issues/apitest", function (done) {
      chai
        .request(server)
        .keepOpen()
        .delete("/api/issues/apitest")
        .send({ _id: "652d1ac2ffaf977717532333" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {
            error: "could not delete",
            _id: "652d1ac2ffaf977717532333",
          });
          done();
        });
    });
  });
});
