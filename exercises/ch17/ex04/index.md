package-lock.json には実際にインストールされた正確なバージョンが記録されているファイルであり、package.jsonに例えば "react": "^16.14.0",と書いてあった場合、package-lock.jsonには "react": "^16.14.5",と詳細なバージョンまで定められている。
このpackage-lock.jsonそ存在することでどの環境でも同じバージョンのパッケージをnpm installでインストールできるようになり依存関係を意識せずに利用することができる。

そのため、バージョンを固定させることができるpackage-lock.jsonはリポジトリにコミットするべきである。
