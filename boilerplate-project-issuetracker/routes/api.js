"use strict";
const mongoose = require("mongoose");

module.exports = function (app) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const issueSchema = new mongoose.Schema({
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true },
    assigned_to: String,
    status_text: String,
    open: { type: Boolean, default: true },
    created_on: { type: Date, required: true },
    updated_on: { type: Date, required: true },
    project: { type: String, required: true },
  });

  const Issue = mongoose.model("Issue", issueSchema);

  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      const project = req.params.project;
      const conditions = req.query;

      Issue.find({ project, ...conditions }).then((arr) => {
        return res.json(arr);
      });
    })

    .post(function (req, res) {
      const project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } =
        req.body;

      if (!issue_title || !issue_text || !created_by)
        return res.json({ error: "required field(s) missing" });

      const newIssue = new Issue({
        issue_title,
        issue_text,
        created_by,
        assigned_to: assigned_to ?? "",
        status_text: status_text ?? "",
        open: true,
        created_on: new Date(),
        updated_on: new Date(),
        project,
      });

      newIssue.save().then((savedIssue, err) => {
        if (err) return res.json({ error: err });
        return res.json(savedIssue);
      });
    })

    .put(function (req, res) {
      const project = req.params.project;
      const { _id, ...updates } = req.body;

      if (!_id) return res.json({ error: "missing _id" });

      Issue.findOneAndUpdate(
        { _id },
        { ...updates, updated_on: new Date() },
        { new: true }
      ).then((issue, err) => {
        if (err) return res.json({ error: "could not update", _id });
        console.log({ issue });

        return res.json({ result: "successfully updated", _id });
      });
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
