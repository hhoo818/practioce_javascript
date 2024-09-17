const socket = new WebSocket("ws://localhost:3003");

//  エラー発生
socket.onerror = (error) => {
  console.log(error);
};

//  メッセージ受信
socket.onmessage = (event) => {
  // メッセージ送信
  try {
    const req = JSON.parse(event.data);
    const resp = { ...req };
    resp.message = `Hello, ${req.message}`;
    socket.send(JSON.stringify(resp));
  } catch (e) {
    throw new Error();
  }
};

//  切断
socket.onclose = () => {
  console.log("disconnect");
};