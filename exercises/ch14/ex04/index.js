export class Hiragana {
  constructor(character) {
    if (!character.match(/^[\u3040-\u309F]$/)) {
      throw new Error();
    }
    this.character = character;
    this.utf16Code = character.charCodeAt(0);
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.utf16Code;
    } else {
      return this.character;
    }
  }
}
