以下のコマンドを実行すると index.html および index.js の内容を元に style.css ファイルが作成される。

```sh
> npx tailwindcss -i ./ex02/input.css -o ./ex02/style.css
```

HTML または JavaScript を変更した後は上記のコマンドを必ず実行し style.css を更新すること。



Tailwind CSS (Tailwindとも) とは、オープンソースのCSSフレームワークである。このライブラリの特徴は、Bootstrapなどの他のCSSフレームワークと異なり、ボタンやテーブルなどの要素に対する一連の定義済みクラスを提供しないことである。代わりに、"ユーティリティ"CSSクラスを提供するので、これを組み合わせて要素をスタイリングする