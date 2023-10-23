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
    console.log({ punctuation, words });

    const convertedWords = words.map((w) => {
      console.log({ w });

      if (americanOnly[w]) {
        console.log(americanOnly[w]);
        return americanOnly[w];
      }

      if (americanToBritishSpelling[w]) {
        console.log(americanToBritishSpelling[w]);
        return americanToBritishSpelling[w];
      }

      if (americanToBritishTitles[w]) {
        console.log(americanToBritishTitles[w]);
        return americanToBritishTitles[w];
      }
      return w;
    });

    const translated = convertedWords.join(" ") + punctuation;
    return translated;
  }

  toAmerican(text) {}
}

module.exports = Translator;
