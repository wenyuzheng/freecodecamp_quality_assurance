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
        return `<span class="highlight">${americanToBritishSpelling[w]}</span>`;
      }

      if (americanOnly[w]) {
        return `<span class="highlight">${americanOnly[w]}</span>`;
      }

      if (americanToBritishTitles[w.toLowerCase()]) {
        const convertedTitle = americanToBritishTitles[w.toLowerCase()];
        return `<span class="highlight">${
          convertedTitle[0].toUpperCase() + convertedTitle.slice(1)
        }</span>`;
      }

      if (/[0-9]+:[0-9]{2}/.test(w)) {
        return `<span class="highlight">${w.replace(":", ".")}</span>`;
      }

      return w;
    });

    text = convertedWords.join(" ");

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
          text = s + `<span class="highlight">${americanOnly[key]}</span>` + e;
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
      if (Object.values(americanToBritishSpelling).includes(w)) {
        return `<span class="highlight">${this.getKeyByValue(
          americanToBritishSpelling,
          w
        )}</span>`;
      }

      if (britishOnly[w]) {
        return `<span class="highlight">${britishOnly[w]}</span>`;
      }

      if (Object.values(americanToBritishTitles).includes(w.toLowerCase())) {
        const convertedTitle = this.getKeyByValue(
          americanToBritishTitles,
          w.toLowerCase()
        );
        return `<span class="highlight">${
          convertedTitle[0].toUpperCase() + convertedTitle.slice(1)
        }</span>`;
      }

      if (/[0-9]+.[0-9]{2}/.test(w)) {
        return `<span class="highlight">${w.replace(".", ":")}</span>`;
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
          text = s + `<span class="highlight">${britishOnly[key]}</span>` + e;
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
