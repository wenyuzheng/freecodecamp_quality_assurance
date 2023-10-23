"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  const toBritishLocale = "american-to-british";
  const toAmericanLocale = "british-to-american";

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;
    console.log({ text, locale });

    if (text === undefined || locale === undefined) {
      return res.json({ error: "Required field(s) missing" });
    }

    if (text === "") {
      return res.json({ error: "No text to translate" });
    }

    if (locale !== toBritishLocale && locale !== toAmericanLocale) {
      return res.json({ error: "Invalid value for locale field" });
    }

    let translation =
      locale === toBritishLocale
        ? translator.toBritish(text)
        : translator.toAmerican(text);

    console.log({ translation });

    if (translation === text) {
      translation = "Everything looks good to me!";
    }

    return res.json({ text, translation });
  });
};
