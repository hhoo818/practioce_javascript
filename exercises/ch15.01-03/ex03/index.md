通常ブラウザで行うとCORSポリシーでブロックされたので`>python -m http.server 8000`でサーバーを立ち上げ動作を確認した。
`index.html`を実行すると、

```
hello world
idne.html:1  Failed to find a valid digest in the 'integrity' attribute for resource 'http://localhost:8000/helloWorld.js' with computed SHA-384 integrity 'D8CUwUSJ6jvBrU3oenivxnGbhfRoBqsMyhq7Hf5G61s/
```
となり、正しいハッシュ値のものは読み込めて、不正な値のものはブロックされた。
これにより、スクリプトの改ざんした
サプライチェーン攻撃：CDN（Content Delivery Network）
クロスサイトスクリプティング（XSS）などを防ぐことができる。