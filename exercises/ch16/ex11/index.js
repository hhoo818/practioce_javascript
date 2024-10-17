import { createServer } from 'net';

// HTMLのレスポンス
const htmlContent = `
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" />
      <label for="greeting">Greeting:</label>
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
`;

const server = createServer((socket) => {
  socket.on('data', (data) => {
    const request = data.toString();
    const [requestLine, ...headers] = request.split('\r\n');
    const [method, path] = requestLine.split(' ');

    // GET リクエストの処理
    if (method === 'GET' && path === '/') {
      const response = `HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nContent-Length: ${Buffer.byteLength(htmlContent)}\r\n\r\n${htmlContent}`;
      socket.write(response);
    } 
    // POST /greeting の処理
    else if (method === 'POST' && path === '/greeting') {
      // リクエストボディの解析
      const body = request.split('\r\n\r\n')[1];
      const params = new URLSearchParams(body);
      const name = params.get('name');
      const greeting = params.get('greeting');

      const responseBody = `
      <!doctype html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Greeting Result</title>
        </head>
        <body>
          <h1>hello ${name}</h1>
          <p>your message: ${greeting}</p>
        </body>
      </html>
      `;

      const response = `HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nContent-Length: ${Buffer.byteLength(responseBody)}\r\n\r\n${responseBody}`;
      socket.write(response);
    } 
    // 未対応のパスやメソッドの場合
    else {
      if (method !== 'GET' && method !== 'POST') {
        // メソッドが不適切
        const response = `HTTP/1.1 405 Method Not Allowed\r\n\r\n`;
        socket.write(response);
      } else {
        // パスが不適切
        const response = `HTTP/1.1 404 Not Found\r\n\r\n`;
        socket.write(response);
      }
    }

    socket.end(); // ソケットを閉じる
  });

  socket.on('error', (err) => {
    console.error('Socket Error: ', err);
  });
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});