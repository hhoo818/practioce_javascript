"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  const eventSource = new EventSource("http://localhost:3000/message");
  // open/error/message が既定イベント
  eventSource.onopen = () => {
    button.classList.add("disabled");
  };
  eventSource.onerror = () => {
    button.classList.remove("disabled");
  };
  eventSource.onmessage = (event) => {
    const parsedData = JSON.parse(event.data);
    const responseElement = document.createElement("div");
    responseElement.className = "message";
    responseElement.textContent = parsedData.value;
    messageContainer.appendChild(responseElement);
  };
}
