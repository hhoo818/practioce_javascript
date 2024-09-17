### hashchangeのとき
`.../#/XXX` とハッシュ値でURLが作られるため、リロードされた時は元のex11/が参照されるので正常に動作する

### pushStateのとき
`ex12/XXX`とURLと作られる。リローさするとex12/XXXを参照しようとする。しかし元データにはそのようなページはない（まだ作られていない）ため404が表示される。


### サーバー側がどのような挙動をすれば pushState を使った実装が期待通り動作するか
最初からある/ex12にフロントエンドにリダイレクトするようにする。