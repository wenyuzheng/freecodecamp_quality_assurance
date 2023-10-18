/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const mongoose = require("mongoose");

module.exports = function (app) {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    comments: [String],
    commentcount: { type: Number, default: 0 },
  });

  const Book = mongoose.model("Book", bookSchema);

  app
    .route("/api/books")
    .get(function (req, res) {
      Book.find().then((books, err) => {
        res.json(books);
      });
    })

    .post(function (req, res) {
      const title = req.body.title;

      if (!title) return res.json("missing required field title");
      Book.create({ title }).then((book, err) => {
        return res.json({ title, _id: book._id });
      });
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      const bookid = req.params.id;
      Book.findById(bookid).then((book, err) => {
        if (book) return res.json(book);
        return res.json("no book exists");
      });
    })

    .post(function (req, res) {
      const bookid = req.params.id;
      const comment = req.body.comment;

      if (!comment) return res.json("missing required field comment");

      Book.findByIdAndUpdate(
        bookid,
        { $push: { comments: comment }, $inc: { commentcount: 1 } },
        { new: true }
      ).then((book, err) => {
        if (book && !err) return res.json(book);
        return res.json("no book exists");
      });
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
};
