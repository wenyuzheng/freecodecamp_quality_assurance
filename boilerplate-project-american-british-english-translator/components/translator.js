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
    console.log({ text, punctuation, words });

    const convertedWords = words.map((w) => {
      console.log({ w });

      if (americanToBritishSpelling[w]) {
        console.log(americanToBritishSpelling[w]);
        return americanToBritishSpelling[w];
      }

      if (americanOnly[w]) {
        console.log(americanOnly[w]);
        return americanOnly[w];
      }

      //   if (americanToBritishTitles[w]) {
      //       console.log(americanToBritishTitles[w]);
      //       return americanToBritishTitles[w];
      //     }
      return w;
    });

    text = convertedWords.join(" ");

    Object.keys(americanOnly).forEach((key) => {
      console.log({ key }, text.includes(key));
      if (text.includes(key)) {
        text = text.replace(key, americanOnly[key]);
      }
    });

    const translated = text + punctuation;
    return translated;
  }

  toAmerican(text) {}
}

module.exports = Translator;
