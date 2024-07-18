export function hello() {
  const messageElement = document.createElement("p");
  messageElement.textContent = "Hello world";
  document.body.appendChild(messageElement);
}
