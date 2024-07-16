1. グローバルオブジェクト
ブラウザ内:window
Node.js内:global
ブラウザとNode.js共通:globalThis

2. ブラウザとnodeのグローバルオブジェクトのプロパティやメソッドを比比較

Node.jsのグローバルオブジェクトには、サーバーサイドのJavaScript環境に特化した様々なプロパティやメソッドがあるのに対し、ブラウザのグローバルオブジェクトであるwindowには、ブラウザ特有のプロパティやメソッドが存在する。
メソッドは以下のものがある。https://developer.mozilla.org/ja/docs/Web/API/Window参照

document: DOM操作のためのオブジェクト
location: 現在のURLに関する情報と操作
history: ブラウザの履歴操作
navigator: ブラウザと環境に関する情報
screen: スクリーンに関する情報
localStorage, sessionStorage: クライアントサイドストレージ
fetch(): ネットワークリクエストを行うためのメソッド
screen: ユーザーのスクリーンに関する情報を提供するオブジェクト。
Event: イベントに関するオブジェクト。

3. undefinedが定義されている
`console.log(globalThis.undefined === undefined);`
で確認でき、`true`がかえってくる 

問題
`undefined = 5;`
とundefinedを定義できたり、
`function foo(undefined) {`
引数でundefinedという言葉がつかえた。
