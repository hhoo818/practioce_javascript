昔はHTMLをロードし、JavaScriptをロードし、HashbangスタイルのURLを認識してレンダリングが行われる、というステップでページが表示されていた（今はURLでHTMLがロードされすぐに表示される）り、javascriptの実行に時間がかかったり、無駄なjavascriptを読み込む仕様だった。
そこで、非同期に処理をさせるhashbangを利用することで問題を解決していた。

しかし、現在は pushState という標準APIが登場したり、最適化が進んだことで利用する必要がなくなった。