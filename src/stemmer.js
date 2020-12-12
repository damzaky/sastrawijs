import defaultDictionary from "./dictionary";

export default class Stemmer {
  constructor(dictionary = defaultDictionary) {
    this.internalDictionary = {};

    dictionary.forEach(word => {
      this.internalDictionary[word] = "";
    });

    this.vowel = "aiueo";
    this.consonant = "bcdfghjklmnpqrstvwxyz";
  }

  addToDict(words) {
    words.forEach(function (word) {
      this.internalDictionary[word] = "";
    });
  }

  remove(words) {
    words.forEach(word => {
      delete this.internalDictionary[word];
    });
  }

  hasPrefix(needle, haystack) {
    return haystack.substr(0, needle.length) == needle;
  }

  find(word) {
    if (this.internalDictionary[word] !== undefined) {
      return true;
    }
    return false;
  }

  print() {
    return this.internalDictionary;
  }

  newChar(word, index) {
    if (index >= word.length) {
      return "";
    }
    return word[index];
  }

  isOneOf(c, chars) {
    const charz = chars.split("");
    for (let i = 0; i < charz.length; i++) {
      if (charz[i] == c) {
        return true;
      }
    }
    return false;
  }

  isNotOneOf(c, chars) {
    return !this.isOneOf(c, chars);
  }

  stem(word) {
    word = word.toLowerCase();

    let rootFound = false;
    const originalWord = word;
    let particle, possesive, suffix, funcret, removedSuffixes;

    if (word.length < 3) {
      return word;
    }
    if (this.find(word)) {
      return word;
    }
    if (/^(be.+lah|be.+an|me.+i|di.+i|pe.+i|ter.+i)$/.test(word)) {
      //ok
      // Remove prefix
      funcret = this.removePrefixes(word);
      rootFound = funcret[0];
      word = funcret[1];
      if (rootFound) {
        return word;
      }
      // Remove particle
      funcret = this.removeParticle(word);
      particle = funcret[0];
      word = funcret[1];
      if (this.find(word)) {
        return word;
      }

      // Remove possesive
      funcret = this.removePossesive(word);
      possesive = funcret[0];
      word = funcret[1];
      if (this.find(word)) {
        return word;
      }

      // Remove suffix
      funcret = this.removeSuffix(word);
      suffix = funcret[0];
      word = funcret[1];
      if (this.find(word)) {
        return word;
      }
    } else {
      // Remove particle
      funcret = this.removeParticle(word);
      particle = funcret[0];
      word = funcret[1];
      if (this.find(word)) {
        return word;
      }

      // Remove possesive
      funcret = this.removePossesive(word);
      possesive = funcret[0];
      word = funcret[1];
      if (this.find(word)) {
        return word;
      }

      // Remove suffix
      funcret = this.removeSuffix(word);
      suffix = funcret[0];
      word = funcret[1];
      if (this.find(word)) {
        return word;
      }
      // Remove prefix
      funcret = this.removePrefixes(word);
      rootFound = funcret[0];
      word = funcret[1];
      if (rootFound) {
        return word;
      }
    }
    // If no root found, do loopPengembalianAkhiran
    removedSuffixes = ["", suffix, possesive, particle];
    if (suffix == "kan") {
      removedSuffixes = ["", "k", "an", possesive, particle];
    }
    funcret = this.lastReturnLoop(originalWord, removedSuffixes);
    rootFound = funcret[0];
    word = funcret[1];
    if (rootFound) {
      return word;
    }

    // When EVERYTHING failed, return original word
    return originalWord;
  }

  removeParticle(word) {
    let result = word.replace(/-?(lah|kah|tah|pun)$/g, "");
    let particle = word.replace(result, "");
    return [particle, result];
  }

  removePossesive(word) {
    let result = word.replace(/-?(ku|mu|nya)$/g, "");
    let possesive = word.replace(result, "");
    return [possesive, result];
  }

  removeSuffix(word) {
    let result = word.replace(/-?(is|isme|isasi|i|kan|an)$/g, "");
    let suffix = word.replace(result, "");
    return [suffix, result];
  }

  lastReturnLoop(originalWord, suffixes) {
    let lenSuffixes = 0;
    suffixes.forEach(suffix => {
      lenSuffixes += suffix.length;
    });
    let wordWithoutSuffix = originalWord.substring(
      0,
      originalWord.length - lenSuffixes
    );
    // suffixes.forEach(function (char, i) {
    for (let i = 0; i < suffixes.length; i++) {
      let suffixCombination = "";
      for (let j = 0; j <= i; j++) {
        suffixCombination += suffixes[j];
      }

      let word = wordWithoutSuffix + suffixCombination;
      if (this.find(word)) {
        return [true, word];
      }

      let funcret = this.removePrefixes(word);
      let rootFound = funcret[0];
      word = funcret[1];
      if (rootFound) {
        return [true, word];
      }
    }
    return [false, originalWord];
  }

  removePrefixes(word) {
    let originalWord = word;
    let currentPrefix = "";
    let removedPrefix = "";
    let recodingChar = [];

    for (let i = 0; i < 3; i++) {
      if (word.length < 3) {
        return [false, originalWord];
      }

      currentPrefix = word.substring(0, 2);
      if (currentPrefix == removedPrefix) {
        break;
      }

      let funcret = this.removePrefix(word);
      removedPrefix = funcret[0];
      word = funcret[1];
      recodingChar = funcret[2];
      if (this.find(word)) {
        return [true, word];
      }
      for (let i in recodingChar) {
        if (this.find(recodingChar[i] + word)) {
          return [true, recodingChar[i] + word];
        }
      }
    }

    return [false, word];
  }

  removePrefix(word) {
    let prefix, result, recoding, funcret;

    if (
      this.hasPrefix("di", word) ||
      this.hasPrefix("ke", word) ||
      this.hasPrefix("se", word) ||
      this.hasPrefix("ku", word)
    ) {
      prefix = word.substring(0, 2);
      result = word.substring(2, word.length);
    } else if (this.hasPrefix("kau", word)) {
      prefix = "kau";
      result = word.substring(3, word.length);
    } else if (this.hasPrefix("me", word)) {
      prefix = "me";
      funcret = this.removeMePrefix(word);
      result = funcret[0];
      recoding = funcret[1];
    } else if (this.hasPrefix("pe", word)) {
      prefix = "pe";
      funcret = this.removePePrefix(word);
      result = funcret[0];
      recoding = funcret[1];
    } else if (this.hasPrefix("be", word)) {
      prefix = "be";
      funcret = this.removeBePrefix(word);
      result = funcret[0];
      recoding = funcret[1];
    } else if (this.hasPrefix("te", word)) {
      prefix = "te";
      funcret = this.removeTePrefix(word);
      result = funcret[0];
      recoding = funcret[1];
    } else {
      funcret = this.removeInfix(word);
      result = funcret[0];
      recoding = funcret[1];
    }
    return [prefix, result, recoding];
  }

  removeMePrefix(word) {
    let s3 = this.newChar(word, 2);
    let s4 = this.newChar(word, 3);
    let s5 = this.newChar(word, 4);

    // Pattern 01
    // me{l|r|w|y}V => me-{l|r|w|y}V
    if (this.isOneOf(s3, "lrwy") && this.isOneOf(s4, this.vowel)) {
      return [word.substring(2, word.length), null];
    }

    // Pattern 02
    // mem{b|f|v} => mem-{b|f|v}
    if (this.isOneOf(s3, "m") && this.isOneOf(s4, "bfv")) {
      return [word.substring(3, word.length), null];
    }

    // Pattern 03
    // mempe => mem-pe
    if (
      this.isOneOf(s3, "m") &&
      this.isOneOf(s4, "p") &&
      this.isOneOf(s5, "e")
    ) {
      return [word.substring(3, word.length), null];
    }

    // Pattern 04
    // mem{rV|V} => mem-{rV|V} OR me-p{rV|V}
    if (
      this.isOneOf(s3, "m") &&
      (this.isOneOf(s4, this.vowel) ||
        (this.isOneOf(s4, "r") && this.isOneOf(s5, this.vowel)))
    ) {
      return [word.substring(3, word.length), ["m", "p"]];
    }

    // Pattern 05
    // men{c|d|j|s|t|z} => men-{c|d|j|s|t|z}
    if (this.isOneOf(s3, "n") && this.isOneOf(s4, "cdjstz")) {
      return [word.substring(3, word.length), null];
    }

    // Pattern 06
    // menV => nV OR tV
    if (this.isOneOf(s3, "n") && this.isOneOf(s4, this.vowel)) {
      return [word.substring(3, word.length), ["n", "t"]];
    }

    // Pattern 07
    // meng{g|h|q|k} => meng-{g|h|q|k}
    if (
      this.isOneOf(s3, "n") &&
      this.isOneOf(s4, "g") &&
      this.isOneOf(s5, "ghqk")
    ) {
      return [word.substring(4, word.length), null];
    }

    // Pattern 08
    // mengV => meng-V OR meng-kV OR me-ngV OR mengV- where V = 'e'
    if (
      this.isOneOf(s3, "n") &&
      this.isOneOf(s4, "g") &&
      this.isOneOf(s5, this.vowel)
    ) {
      if (this.isOneOf(s5, "e")) {
        return [word.substring(5, word.length), null];
      }

      return [word.substring(4, word.length), ["ng", "k"]];
    }

    // Pattern 09
    // menyV => meny-sV OR me-nyV to stem menyala
    if (
      this.isOneOf(s3, "n") &&
      this.isOneOf(s4, "y") &&
      this.isOneOf(s5, this.vowel)
    ) {
      if (this.isOneOf(s5, "a")) {
        return [word.substring(2, word.length), null];
      }

      return ["s" + word.substring(4, word.length), null];
    }

    // Pattern 10
    // mempV => mem-pV where V != 'e'
    if (
      this.isOneOf(s3, "m") &&
      this.isOneOf(s4, "p") &&
      this.isNotOneOf(s5, "e")
    ) {
      return [word.substring(3, word.length), null];
    }

    return [word, null];
  }

  removePePrefix(word) {
    let s3 = this.newChar(word, 2);
    let s4 = this.newChar(word, 3);
    let s5 = this.newChar(word, 4);
    let s6 = this.newChar(word, 5);
    let s7 = this.newChar(word, 6);
    let s8 = this.newChar(word, 7);

    // Pattern 01
    // pe{w|y}V => pe-{w|y}V
    if (this.isOneOf(s3, "wy") && this.isOneOf(s4, this.vowel)) {
      return [word.substring(2, word.length), null];
    }

    // Pattern 02
    // perV => per-V OR pe-rV
    if (this.isOneOf(s3, "r") && this.isOneOf(s4, this.vowel)) {
      return [word.substring(3, word.length), ["r"]];
    }

    // Pattern 03
    // perCAP => per-CAP where C != 'r' and P != 'er'
    if (
      this.isOneOf(s3, "r") &&
      this.isOneOf(s4, this.consonant) &&
      this.isNotOneOf(s4, "r") &&
      this.isNotOneOf(s5, "") &&
      this.isNotOneOf(s6, "e")
    ) {
      return [word.substring(3, word.length), null];
    }

    // Pattern 4
    // perCAerV => per-CAerV where C != 'r'
    if (
      this.isOneOf(s3, "r") &&
      this.isOneOf(s4, this.consonant) &&
      this.isNotOneOf(s4, "r") &&
      this.isNotOneOf(s5, "") &&
      this.isOneOf(s6, "e") &&
      this.isOneOf(s7, "r") &&
      this.isOneOf(s8, this.vowel)
    ) {
      return [word.substring(3, word.length), null];
    }

    // Pattern 05
    // pem{b|f|v} => pem-{b|f|v}
    if (this.isOneOf(s3, "m") && this.isOneOf(s4, "bfv")) {
      return [word.substring(3, word.length), null];
    }

    // Pattern 06
    // pem{rV|V} => pe-m{rV|V} OR pe-p{rV|V}
    if (
      this.isOneOf(s3, "m") &&
      (this.isOneOf(s4, this.vowel) ||
        (this.isOneOf(s4, "r") && this.isOneOf(s5, this.vowel)))
    ) {
      return [word.substring(3, word.length), ["m", "p"]];
    }

    // Pattern 07
    // pen{c|d|j|s|t|z} => pen-{c|d|j|s|t|z}
    if (this.isOneOf(s3, "n") && this.isOneOf(s4, "cdjstz")) {
      return [word.substring(3, word.length), null];
    }

    // Pattern 08
    // penV => pe-nV OR pe-tV
    if (this.isOneOf(s3, "n") && this.isOneOf(s4, this.vowel)) {
      return [word.substring(3, word.length), ["n", "t"]];
    }

    // Pattern 09
    // pengC => peng-C
    if (
      this.isOneOf(s3, "n") &&
      this.isOneOf(s4, "g") &&
      this.isOneOf(s5, this.consonant)
    ) {
      return [word.substring(4, word.length), null];
    }

    // Pattern 10
    // pengV => peng-V OR peng-kV OR pengV- where V = 'e'
    if (
      this.isOneOf(s3, "n") &&
      this.isOneOf(s4, "g") &&
      this.isOneOf(s5, this.vowel)
    ) {
      if (this.isOneOf(s5, "e")) {
        return [word.substring(5, word.length), null];
      }

      return [word.substring(4, word.length), ["k"]];
    }

    // Pattern 11
    // penyV => peny-sV OR pe-nyV
    if (
      this.isOneOf(s3, "n") &&
      this.isOneOf(s4, "y") &&
      this.isOneOf(s5, this.vowel)
    ) {
      return [word.substring(4, word.length), ["s", "ny"]];
    }

    // Pattern 12
    // pelV => pe-lV OR pel-V for pelajar
    if (this.isOneOf(s3, "l") && this.isOneOf(s4, this.vowel)) {
      if (word == "pelajar") {
        return ["ajar", null];
      }

      return [word.substring(2, word.length), null];
    }

    // Pattern 13
    // peCerV => per-erV where C != {r|w|y|l|m|n}
    if (
      this.isOneOf(s3, this.consonant) &&
      this.isNotOneOf(s3, "rwylmn") &&
      this.isOneOf(s4, "e") &&
      this.isOneOf(s5, "r") &&
      this.isOneOf(s6, this.vowel)
    ) {
      return [word.substring(3, word.length), null];
    }

    // Pattern 14
    // peCP => pe-CP where C != {r|w|y|l|m|n} and P != 'er'
    if (
      this.isOneOf(s3, this.consonant) &&
      this.isNotOneOf(s3, "rwylmn") &&
      this.isNotOneOf(s3, "e")
    ) {
      return [word.substring(2, word.length), null];
    }

    // Pattern 15
    // peC1erC2 => pe-C1erC2 where C1 != {r|w|y|l|m|n}
    if (
      this.isOneOf(s3, this.consonant) &&
      this.isNotOneOf(s3, "rwylmn") &&
      this.isOneOf(s4, "e") &&
      this.isOneOf(s5, "r") &&
      this.isOneOf(s6, this.consonant)
    ) {
      return [word.substring(2, word.length), null];
    }

    return [word, null];
  }

  removeBePrefix(word) {
    let s3 = this.newChar(word, 2);
    let s4 = this.newChar(word, 3);
    let s5 = this.newChar(word, 4);
    let s6 = this.newChar(word, 5);
    let s7 = this.newChar(word, 6);
    let s8 = this.newChar(word, 7);
    // Pattern 01
    // berV => ber-V OR be-rV
    if (this.isOneOf(s3, "r") && this.isOneOf(s4, this.vowel)) {
      return [word.substring(3, word.length), ["r"]];
    }

    // Pattern 02
    // berCAP => ber-CAP
    if (
      this.isOneOf(s3, "r") &&
      this.isOneOf(s4, this.consonant) &&
      this.isNotOneOf(s4, "r") &&
      this.isNotOneOf(s5, "") &&
      this.isNotOneOf(s6, "e")
    ) {
      return [word.substring(3, word.length), null];
    }

    // Pattern 3
    // berCAerV => ber-CAerV where C != 'r'
    if (
      this.isOneOf(s3, "r") &&
      this.isOneOf(s4, this.consonant) &&
      this.isNotOneOf(s4, "r") &&
      this.isNotOneOf(s5, "") &&
      this.isOneOf(s6, "e") &&
      this.isOneOf(s7, "r") &&
      this.isOneOf(s8, this.vowel)
    ) {
      return [word.substring(3, word.length), null];
    }

    // Pattern 04
    // belajar => bel-ajar
    if (word == "belajar") {
      return [word.substring(3, word.length), null];
    }

    // Pattern 5
    // beC1erC2 => be-C1erC2 where C1 != {'r'|'l'}
    if (
      this.isOneOf(s3, this.consonant) &&
      this.isNotOneOf(s3, "r") &&
      this.isNotOneOf(s3, "l") &&
      this.isOneOf(s4, "e") &&
      this.isOneOf(s5, "r") &&
      this.isOneOf(s6, this.consonant)
    ) {
      return [word.substring(2, word.length), null];
    }
    return [word, null];
  }

  removeTePrefix(word) {
    let s3 = this.newChar(word, 2);
    let s4 = this.newChar(word, 3);
    let s5 = this.newChar(word, 4);
    let s6 = this.newChar(word, 5);
    let s7 = this.newChar(word, 6);

    // Pattern 01
    // terV => ter-V OR te-rV
    if (this.isOneOf(s3, "r") && this.isOneOf(s4, this.vowel)) {
      return [word.substring(3, word.length), ["r"]];
    }

    // Pattern 02
    // terCerV => ter-CerV where C != 'r'
    if (
      this.isOneOf(s3, "r") &&
      this.isOneOf(s4, this.consonant) &&
      this.isNotOneOf(s4, "r") &&
      this.isOneOf(s5, "e") &&
      this.isOneOf(s6, "r") &&
      this.isOneOf(s7, this.vowel)
    ) {
      return [word.substring(3, word.length), null];
    }

    // Pattern 3
    // terCP => ter-CP where C != 'r' and P != 'er'
    if (
      this.isOneOf(s3, "r") &&
      this.isOneOf(s4, this.consonant) &&
      this.isNotOneOf(s4, "r") &&
      this.isNotOneOf(s5, "e")
    ) {
      return [word.substring(3, word.length), null];
    }

    // Pattern 04
    // teC1erC2 => te-C1erC2 where C1 != 'r'
    if (
      this.isOneOf(s3, this.consonant) &&
      this.isNotOneOf(s3, "r") &&
      this.isOneOf(s4, "e") &&
      this.isOneOf(s5, "r") &&
      this.isOneOf(s6, this.consonant)
    ) {
      return [word.substring(2, word.length), null];
    }

    // Pattern 05
    // terC1erC2 => ter-C1erC2 where C1 != 'r'
    if (
      this.isOneOf(s3, "r") &&
      this.isOneOf(s4, this.consonant) &&
      this.isNotOneOf(s4, "r") &&
      this.isOneOf(s5, "e") &&
      this.isOneOf(s6, "r") &&
      this.isOneOf(s7, this.consonant)
    ) {
      return [word.substring(3, word.length), null];
    }

    return [word, null];
  }

  removeInfix(word) {
    let s1 = this.newChar(word, 0);
    let s2 = this.newChar(word, 1);
    let s3 = this.newChar(word, 2);
    let s4 = this.newChar(word, 3);

    // Pattern 01
    // CerV => CerV OR CV
    if (
      this.isOneOf(s1, this.consonant) &&
      this.isOneOf(s2, "e") &&
      this.isOneOf(s3, "rlm") &&
      this.isOneOf(s4, this.vowel)
    ) {
      return [
        word.substring(3, word.length),
        [word.substring(0, 3), word.substring(0, 1)],
      ];
    }

    // Pattern 02
    // CinV => CinV OR CV
    if (
      this.isOneOf(s1, this.consonant) &&
      this.isOneOf(s2, "i") &&
      this.isOneOf(s3, "n") &&
      this.isOneOf(s4, this.vowel)
    ) {
      return [
        word.substring(3, word.length),
        [word.substring(0, 3), word.substring(0, 1)],
      ];
    }

    return [word, null];
  }
}
