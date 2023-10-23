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

    // Object.keys(americanOnly).forEach((key) => {
    //   if (text.toLowerCase().includes(key)) {
    //     text = text.toLowerCase().replace(key, americanOnly[key]);
    //   }
    // });

    Object.keys(americanOnly).forEach((key) => {
      const index = text.toLowerCase().indexOf(key);
      const startIndex = index === 0 ? 0 : index - 1;
      const endIndex =
        index + key.length === text.length
          ? text.length
          : index + key.length + 1;

      const phraseWithSpace = text.slice(startIndex, endIndex);

      const isStartValid = index === 0 ? true : /^\s/.test(phraseWithSpace);
      const isEndValid =
        index + key.length === text.length
          ? true
          : phraseWithSpace.endsWith(" ");

      if (isStartValid && isEndValid) {
        if (text.toLowerCase().includes(key)) {
          const s = text.slice(0, index);
          const e = text.slice(index + key.length);
          text = s + americanOnly[key] + e;
        }
      }
    });

    const translated = text[0].toUpperCase() + text.slice(1) + punctuation;
    return translated;
  }

  toAmerican(text) {
    let punctuation = "";
    const lastChar = text[text.length - 1];
    if (!/[a-zA-Z]/.test(lastChar)) {
      punctuation = lastChar;
      text = text.slice(0, -1);
    }

    const words = text.split(" ");
    const convertedWords = words.map((w) => {
      console.log({ w });

      if (Object.values(americanToBritishSpelling).includes(w)) {
        return this.getKeyByValue(americanToBritishSpelling, w);
      }

      if (britishOnly[w]) {
        return britishOnly[w];
      }

      if (Object.values(americanToBritishTitles).includes(w.toLowerCase())) {
        const convertedTitle = this.getKeyByValue(
          americanToBritishTitles,
          w.toLowerCase()
        );
        return convertedTitle[0].toUpperCase() + convertedTitle.slice(1);
      }

      if (/[0-9]+.[0-9]{2}/.test(w)) {
        return w.replace(".", ":");
      }

      return w;
    });

    text = convertedWords.join(" ");

    Object.keys(britishOnly).forEach((key) => {
      const index = text.toLowerCase().indexOf(key);
      const startIndex = index === 0 ? 0 : index - 1;
      const endIndex =
        index + key.length === text.length
          ? text.length
          : index + key.length + 1;

      const phraseWithSpace = text.slice(startIndex, endIndex);

      const isStartValid = index === 0 ? true : /^\s/.test(phraseWithSpace);
      const isEndValid =
        index + key.length === text.length
          ? true
          : phraseWithSpace.endsWith(" ");

      if (isStartValid && isEndValid) {
        if (text.toLowerCase().includes(key)) {
          const s = text.slice(0, index);
          const e = text.slice(index + key.length);
          text = s + britishOnly[key] + e;
        }
      }
    });

    const translated = text[0].toUpperCase() + text.slice(1) + punctuation;
    return translated;
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
}

module.exports = Translator;
