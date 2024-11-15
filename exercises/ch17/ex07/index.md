// https://blog.logrocket.com/babel-vs-typescript-choosing-right-compiler-project/

### TypeScriptコンパイラ
TypeScriptコンパイラ（tsc）は、TypeScriptコードをブラウザやNode.jsで実行可能なプレーンなJavaScriptに変換する役割を担っており、以下のようなプロセスを行う。
- TypeScriptコードの入力
- 字句解析（スキャニング）
- 構文解析（パース）
- 意味解析（型チェック）
- 変換とJavaScriptへの出力
- JavaScriptファイルの生成
- 宣言ファイル（.d.ts）の生成


### babel
babelはJavaScriptコンパイラで、最新のECMAScript機能を使って最新のJavaScriptコードを記述し、古いブラウザや環境でも互換性を保ちながら実行できるようにする。

TypeScriptが静的型付けと高度な言語機能を提供する一方で、BabelはTypeScriptのコードを広くサポートされているJavaScriptのバージョンに移植できるようにすることで、それを補完している。
補完例としては以下のようなものがある。
- トランスパイル
- ビルドツールとの互換性
- 移行の容易化
- ReactおよびJSXのサポート
- プラグインを用いたカスタマイズ
- 実験的TypeScript機能のサポート

### tscとbabelの違い
大きな違いとしてはtscは型チェック、JavaScriptへのコード変換、型定義ファイルの生成全てができるが、babelはコード変換の部分のみ対応可能な点である。
またBabelでは`const enum`に対応していない。

その一方、BabelはTypeScriptよりも拡張性に優れており、コードを最適化し、未使用のインポートや定数を削除するなど、多数のプラグインが用意されている。また、環境が新しいJavaScript機能に対応していない場合に、その機能をサポートするコードを追加するプロセスをもっている。
