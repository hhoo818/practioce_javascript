1. クロスオリジンリクエストに制約が無かった場合、どのような問題が発生するか述べなさい

悪意のあるウェブサイトが、ユーザーの認証情報を利用して他のサイトにリクエストを送信し、機密情報を取得する「クロスサイトリクエストフォージェリ（CSRF）」のリスクが高まるなど、機密情報漏洩やプライバシーの侵害といったセキュリティ問題が発生する。

2. クロスオリジンリクエストで メソッド(`POST`/`GET`)やリクエストの内容によって Preflight リクエストの有無が異なるのは何故か、その理由を述べなさい

リクエストの種類や内容によるリスクの度合いに応じて決定され、リスクが高い操作には事前確認が求められる仕組みとなっているため。
例えば、POST、PUT、DELETEなどのメソッドや、カスタムヘッダーを含むリクエストは、潜在的に危険な操作を行う可能性があるため、事前にサーバーに確認する仕組みになっている。
加えて確認が必要ないものは省略することでパフォーマンス低下を抑えている。
例えば、GETやHEADメソッドは、一般的に安全と見なされ、データの取得のみを行うため、Preflightリクエストを省略することでパフォーマンスを向上さている。