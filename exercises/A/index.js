import express from "express";
import cors from "cors";

const app = express();

// CORSを全てのオリジンに許可
app.use(cors());

// 特定のエンドポイント
app.get("/api/data", (req, res) => {
  // リクエストのヘッダーを表示
  console.log("Request Headers:", req.headers);

  // HTMLをレスポンスとして返す
  const htmlContent = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>こんにちは</body>
    </html>
  `;

  res.send(htmlContent);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
