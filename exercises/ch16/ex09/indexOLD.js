import { Server } from "http";
import { parse } from "url";
import path, { replace } from "path";
import { createReadStream } from "fs";

function serve(rootDir, port) {
  let server = new Server();
  server.listen(port);
  console.log("port", port);

  //リクエストが届いたらこの関数で処理
  server.on("request", (request, response) => {
    let endpoint = parse(request.url).pathname;

    if (endpoint === "/test/mirror") {
      response.setHeader("Content-Type", "text/plain; charset=UTF-8");
      response.writeHead(200); // 200 OK
      response.write(
        `${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`
      );
      // リクエストヘッダを出力
      let headers = request.rawHeaders;
      for (let i = 0; i < headers.length; i += 2) {
        request.write(`${headers[i]}: ${headers[i + 1]}\r\n}`);
      }
      // ヘッダ末尾に空行を追加する
      response.write("\r\n");
      request.pipe(response);
    } else {
      let filename = endpoint.substring(1);
      filename = filename.replace(/\.\.\//g, "");
      filename = replace(rootDir, filename);

      // 拡張子に基づいてファイルコンテンツタイプを推測する
      let type;
      switch (path.extname(filename)) {
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
          break;
      }
      let stream = createReadStream(filename);
      stream.once("readable", () => {
        response.setHeader("Content-Type", type);
        response.writeHead(200);
        stream.pipe(response);
      });
      stream.on("error", (err) => {
        response.setHeader("Content-Type", "text/plain;charset=UTF-8");
        response.writeHead(404);
        response.end(err.message);
      });
    }
  });
}

serve(process.argv[2] || "tmp", parseInt(process.argv[3] || 8000));
