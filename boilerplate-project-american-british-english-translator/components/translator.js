// const americanOnly = require("./american-only.js");
// const americanToBritishSpelling = require("./american-to-british-spelling.js");
// const americanToBritishTitles = require("./american-to-british-titles.js");
// const britishOnly = require("./british-only.js");

// class Translator {
//   toBritish(text) {
//     let punctuation = "";
//     const lastChar = text[text.length - 1];
//     if (!/[a-zA-Z]/.test(lastChar)) {
//       punctuation = lastChar;
//       text = text.slice(0, -1);
//     }

//     const words = text.split(" ");
//     const convertedWords = words.map((w) => {
//       if (americanToBritishSpelling[w]) {
//         return `<span class="highlight">${americanToBritishSpelling[w]}</span>`;
//       }

//       if (americanOnly[w]) {
//         return `<span class="highlight">${americanOnly[w]}</span>`;
//       }

//       if (americanToBritishTitles[w.toLowerCase()]) {
//         const convertedTitle = americanToBritishTitles[w.toLowerCase()];
//         return `<span class="highlight">${
//           convertedTitle[0].toUpperCase() + convertedTitle.slice(1)
//         }</span>`;
//       }

//       if (/[0-9]+:[0-9]{2}/.test(w)) {
//         return `<span class="highlight">${w.replace(":", ".")}</span>`;
//       }

//       return w;
//     });

//     text = convertedWords.join(" ");

//     Object.keys(americanOnly).forEach((key) => {
//       const index = text.toLowerCase().indexOf(key);
//       const startIndex = index === 0 ? 0 : index - 1;
//       const endIndex =
//         index + key.length === text.length
//           ? text.length
//           : index + key.length + 1;

//       const phraseWithSpace = text.slice(startIndex, endIndex);

//       const isStartValid = index === 0 ? true : /^\s/.test(phraseWithSpace);
//       const isEndValid =
//         index + key.length === text.length
//           ? true
//           : phraseWithSpace.endsWith(" ");

//       if (isStartValid && isEndValid) {
//         if (text.toLowerCase().includes(key)) {
//           const s = text.slice(0, index);
//           const e = text.slice(index + key.length);
//           text = s + `<span class="highlight">${americanOnly[key]}</span>` + e;
//         }
//       }
//     });

//     const translated = text[0].toUpperCase() + text.slice(1) + punctuation;
//     return translated;
//   }

//   toAmerican(text) {
//     let punctuation = "";
//     const lastChar = text[text.length - 1];
//     if (!/[a-zA-Z]/.test(lastChar)) {
//       punctuation = lastChar;
//       text = text.slice(0, -1);
//     }

//     const words = text.split(" ");
//     const convertedWords = words.map((w) => {
//       if (Object.values(americanToBritishSpelling).includes(w)) {
//         return `<span class="highlight">${this.getKeyByValue(
//           americanToBritishSpelling,
//           w
//         )}</span>`;
//       }

//       if (britishOnly[w]) {
//         return `<span class="highlight">${britishOnly[w]}</span>`;
//       }

//       if (Object.values(americanToBritishTitles).includes(w.toLowerCase())) {
//         const convertedTitle = this.getKeyByValue(
//           americanToBritishTitles,
//           w.toLowerCase()
//         );
//         return `<span class="highlight">${
//           convertedTitle[0].toUpperCase() + convertedTitle.slice(1)
//         }</span>`;
//       }

//       if (/[0-9]+.[0-9]{2}/.test(w)) {
//         return `<span class="highlight">${w.replace(".", ":")}</span>`;
//       }

//       return w;
//     });

//     text = convertedWords.join(" ");

//     Object.keys(britishOnly).forEach((key) => {
//       const index = text.toLowerCase().indexOf(key);
//       const startIndex = index === 0 ? 0 : index - 1;
//       const endIndex =
//         index + key.length === text.length
//           ? text.length
//           : index + key.length + 1;

//       const phraseWithSpace = text.slice(startIndex, endIndex);

//       const isStartValid = index === 0 ? true : /^\s/.test(phraseWithSpace);
//       const isEndValid =
//         index + key.length === text.length
//           ? true
//           : phraseWithSpace.endsWith(" ");

//       if (isStartValid && isEndValid) {
//         if (text.toLowerCase().includes(key)) {
//           const s = text.slice(0, index);
//           const e = text.slice(index + key.length);
//           text = s + `<span class="highlight">${britishOnly[key]}</span>` + e;
//         }
//       }
//     });

//     const translated = text[0].toUpperCase() + text.slice(1) + punctuation;
//     return translated;
//   }

//   getKeyByValue(object, value) {
//     return Object.keys(object).find((key) => object[key] === value);
//   }
// }

// module.exports = Translator;

const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

const translateTime = (text, toBritish) => {
  const from = toBritish ? ":" : ".";
  const to = toBritish ? "." : ":";

  const timeRegex = new RegExp("[0-9]+" + from + "[0-9]{2}");
  if (timeRegex.test(text)) {
    return `<span class="highlight">${text.replace(from, to)}</span>`;
  }
  return text;
};

const translateTitle = (text, toBritish) => {
  for (const [k, v] of Object.entries(americanToBritishTitles)) {
    const from = toBritish ? k : v;
    const to = toBritish ? v : k;

    if (text.toLowerCase() === from) {
      return `<span class="highlight">${capitalise(to)}</span>`;
    }
  }
  return text;
};

const translateSpelling = (text, toBritish) => {
  for (const [k, v] of Object.entries(americanToBritishSpelling)) {
    const from = toBritish ? k : v;
    const to = toBritish ? v : k;

    if (text.toLowerCase() === from) {
      return `<span class="highlight">${to}</span>`;
    }
  }
  return text;
};

const capitalise = (text) => {
  return text[0].toUpperCase() + text.slice(1);
};

class Translator {
  toBritish(text) {
    const r = text.split(" ").map((e) => {
      const t = translateTime(e, true);
      const title = translateTitle(t, true);
      return translateSpelling(title, true);
    });

    console.log(r);
    return r.join(" ");
  }

  toAmerican(text) {
    const r = text.split(" ").map((e) => {
      const t = translateTime(e, false);
      const title = translateTitle(t, false);
      return translateSpelling(title, false);
    });

    console.log(r);
    return r.join(" ");
  }
}

module.exports = Translator;
module.exports.translateTitle = translateTitle;
