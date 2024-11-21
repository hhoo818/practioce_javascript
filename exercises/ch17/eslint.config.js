module.exports = [
  {
    files: ["**/*.js"], // 適用対象ファイル
    languageOptions: {
      ecmaVersion: "latest", // 最新のECMAScript構文を使用
      sourceType: "module", // ES Modulesをサポート
    },
    extends: ["eslint:recommended", "google"], // Googleスタイルガイドに従う
    rules: {},
  },
];
