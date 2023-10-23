const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

const Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  suite("POST /api/translate", () => {
    // test("With valid text and locale", (done) => {
    //   chai
    //     .request(server)
    //     .post("/api/translate")
    //     .send({
    //       text: "Mangoes are my favorite fruit.",
    //       locale: "american-to-british",
    //     })
    //     .end((err, res) => {
    //       assert.equal(res.status, 200);
    //       assert.deepEqual(res.body, {
    //         text: "Mangoes are my favorite fruit.",
    //         translation: "Mangoes are my favourite fruit.",
    //       });
    //       done();
    //     });
    // });

    test("With valid text and invalid locale", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({
          text: "Mangoes are my favorite fruit.",
          locale: "american-to",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {
            error: "Invalid value for locale field",
          });
          done();
        });
    });

    test("With missing text field", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({
          locale: "american-to-british",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "Required field(s) missing" });
          done();
        });
    });

    test("With missing locale field", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({
          text: "Mangoes are my favorite fruit.",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "Required field(s) missing" });
          done();
        });
    });

    test("With empty text", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({
          text: "",
          locale: "american-to-british",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "No text to translate" });
          done();
        });
    });

    // test("With text no need translation", (done) => {
    //   chai
    //     .request(server)
    //     .post("/api/translate")
    //     .send({
    //       text: "",
    //       locale: "american-to-british",
    //     })
    //     .end((err, res) => {
    //       assert.equal(res.status, 200);
    //       assert.deepEqual(res.body, {
    //         text: "Mangoes are my favorite fruit.",
    //         translation: "Everything looks good to me!",
    //       });
    //       done();
    //     });
    // });
  });
});
