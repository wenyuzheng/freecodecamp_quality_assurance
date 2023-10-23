const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  toBritish(text) {
    let punctuation = "";
    const lastChar = text[text.length - 1];
    if (!/[a-zA-Z]/.test(lastChar)) {
      punctuation = lastChar;
      text = text.slice(0, -1);
    }

    const words = text.split(" ");
    const convertedWords = words.map((w) => {
      console.log({ w });

      if (americanToBritishSpelling[w]) {
        return americanToBritishSpelling[w];
      }

      if (americanOnly[w]) {
        return americanOnly[w];
      }

      if (americanToBritishTitles[w.toLowerCase()]) {
        const convertedTitle = americanToBritishTitles[w.toLowerCase()];
        return convertedTitle[0].toUpperCase() + convertedTitle.slice(1);
      }

      if (/[0-9]+:[0-9]{2}/.test(w)) {
        return w.replace(":", ".");
      }

      return w;
    });

    text = convertedWords.join(" ");

    Object.keys(americanOnly).forEach((key) => {
      if (text.toLowerCase().includes(key)) {
        text = text.toLowerCase().replace(key, americanOnly[key]);
      }
    });

    const translated = text[0].toUpperCase() + text.slice(1) + punctuation;
    return translated;
  }

  toAmerican(text) {}
}

module.exports = Translator;
