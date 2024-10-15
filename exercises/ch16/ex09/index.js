import express from "express";
import { join, extname } from "path";
import { createReadStream } from "fs";
const app = express();

function serve(rootDir, port) {
  app.get("/test/mirror", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.writeHead(200);

    // リクエストラインを書き込む
    res.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);

    // リクエストヘッダを書き込む
    for (const [key, value] of Object.entries(req.headers)) {
      res.write(`${key}: ${value}\r\n`);
    }

    // ヘッダの後に空行を追加し、リクエストボディをレスポンスとして返す
    res.write("\r\n");
    req.pipe(res);
  });

  app.get("*", (req, res) => {
    let endpoint = req.path;
    let filename = endpoint.substring(1).replace(/\.\.\//g, "");
    filename = join(rootDir, filename);

    // 拡張子に基づいてファイルコンテンツタイプを設定
    let type;
    switch (extname(filename)) {
      case ".html":
      case ".htm":
        type = "text/html";
        break;
      case ".js":
        type = "text/javascript";
        break;
      case ".css":
        type = "text/css";
        break;
      case ".png":
        type = "image/png";
        break;
      case ".txt":
        type = "text/plain";
        break;
      default:
        type = "application/octet-stream";
    }

    createReadStream(filename)
      .on("open", () => {
        res.setHeader("Content-Type", type);
        res.writeHead(200);
        createReadStream(filename).pipe(res);
      })
      .on("error", (err) => {
        res.setHeader("Content-Type", "text/plain;charset=UTF-8");
        res.writeHead(404);
        res.end(err.message);
      });
  });

  app.listen(port, () => {
    console.log("Server running on port", port);
  });
}

serve(process.argv[2] || "tmp", parseInt(process.argv[3]) || 3000);
