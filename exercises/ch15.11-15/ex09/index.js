const ROWS = 50;
const COLS = 50;
const RESOLUTION = 10;
const ctx = canvas.getContext("2d");
const canvas = document.querySelector("#screen");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;
let grid = null;
let animationId = null;

const socket = new WebSocket("ws://localhost:3003");

// エラー発生時に接続を閉じる
socket.onerror = (error) => {
  console.log(error);
  socket.close(); // 接続を閉じる
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === "update") {
    renderGrid(data.grid);
  } else if (data.type === "pause") {
    if (!animationId) {
      return;
    }
    cancelAnimationFrame(animationId);
  } else if (data.type === "start") {
    // 既にアニメーションが動いている場合は何もしない
    if (animationId) {
      return;
    }
    update();
  }
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

// WebSocket接続が閉じられたときの処理
socket.onclose = () => {
  console.log("disconnect");
};

// クリックされたセルを反転させ、サーバーに通知
canvas.addEventListener("click", (evt) => {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);

  // セルの反転
  grid[row][col] = !grid[row][col];
  renderGrid(grid);

  // サーバーにセルの反転を通知
  socket.send(JSON.stringify({ type: "toggle", row, col }));
});

// Pauseボタンが押されたとき
pauseButton.addEventListener("click", () => {
  if (!animationId) {
    return;
  }
  socket.send(JSON.stringify({ type: "pause" }));
  cancelAnimationFrame(animationId);
  animationId = null;
});

// Startボタンが押されたとき
startButton.addEventListener("click", () => {
  if (animationId) {
    return;
  }
  socket.send(JSON.stringify({ type: "start" }));
  update();
});

// グリッドを描画する関数
function renderGrid(grid) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

// ゲームの状態を更新する関数
function update() {
  if (!grid) return;
  animationId = requestAnimationFrame(update);
}
