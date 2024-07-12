// 後で直す

export class IgnoreAccentPattern {
  constructor(pattern) {
    this.pattern =
      pattern instanceof RegExp ? pattern : new RegExp(pattern, "g");
  }

  static normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // 正規表現の `search` メソッドをオーバーライド
  [Symbol.search](str) {
    const normalizedStr = IgnoreAccentPattern.normalizeString(str);
    const normalizedPattern = IgnoreAccentPattern.normalizeString(
      this.pattern.source
    );
    const flags = this.pattern.flags;
    const regex = new RegExp(normalizedPattern, flags);
    return normalizedStr.search(regex);
  }

  // 正規表現の `match` メソッドをオーバーライド
  [Symbol.match](str) {
    const normalizedStr = IgnoreAccentPattern.normalizeString(str);
    const normalizedPattern = IgnoreAccentPattern.normalizeString(
      this.pattern.source
    );
    const flags = this.pattern.flags;
    const regex = new RegExp(normalizedPattern, flags);
    return normalizedStr.match(regex);
  }
}
