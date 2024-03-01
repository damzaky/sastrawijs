type Dictionary = string[];

export class Stemmer {
  internalDictionary: Record<string, string>;
  vowel: string;
  consonant: string;

  constructor(dictionary?: Dictionary);

  addToDict(words: string[]): void;

  remove(words: string[]): void;

  hasPrefix(needle: string, haystack: string): boolean;

  find(word: string): boolean;

  print(): Record<string, string>;

  newChar(word: string, index: number): string;

  isOneOf(c: string, chars: string): boolean;

  isNotOneOf(c: string, chars: string): boolean;

  stem(word: string): string;

  removeParticle(word: string): [string, string];

  removePossesive(word: string): [string, string];

  removeSuffix(word: string): [string, string];

  lastReturnLoop(originalWord: string, suffixes: string[]): [boolean, string];

  removePrefixes(word: string): [boolean, string];

  removePrefix(word: string): [string, string, string[]];

  removeMePrefix(word: string): [string, string[] | null];

  removePePrefix(word: string): [string, string[] | null];

  removeBePrefix(word: string): [string, string[] | null];

  removeTePrefix(word: string): [string, string[] | null];

  removeInfix(word: string): [string, [string, string] | null];
}

