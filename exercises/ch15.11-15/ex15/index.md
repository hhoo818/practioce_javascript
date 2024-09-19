URLの露出リスクの低減できる:
パスやクエリパラメータは URL の一部となり、ブラウザの履歴やサーバーのログに記録される可能性が高くなります。
ヘッダーは通常これらのログに記録されないため、機密情報の露出リスクが低くなる


中間者攻撃からの保護できる:
HTTPS を使用している場合、ヘッダーを含むリクエスト全体が暗号化できる一方、URL は様々な場面で露出する可能性があり、中間者攻撃のリスクが高まる


リファラーヘッダーによる情報漏洩の防止する:

ブラウザは通常、リクエスト時に前のページの URL をリファラーヘッダーとして送信するため、URLに機密情報が含まれていると、他のサイトにその情報が漏洩する可能性がある

キャッシュサーバーでの保護:
URLはキャッシュサーバーに保存される可能性があるが、ヘッダーは通常キャッシュされない。
これにより、機密情報がキャッシュサーバー上に残

クロスサイトスクリプティング（XSS）攻撃からの保護:
URL パラメータは JavaScript から簡単にアクセスできるため、XSS 攻撃できやすい一方、
ヘッダーは JavaScript から直接アクセスすることが難しい。