document.addEventListener("DOMContentLoaded", function () {
  // SVG要素の名前空間
  const svgNS = "http://www.w3.org/2000/svg";

  // 新しい<line>要素を作成
  const secHand = document.createElementNS(svgNS, "line");

  // 属性を設定
  secHand.setAttribute("class", "sechand");
  secHand.setAttribute("x1", "50");
  secHand.setAttribute("y1", "50");
  secHand.setAttribute("x2", "50");
  secHand.setAttribute("y2", "10");

  // 既存の<g class="hands">要素を取得し、そこに追加
  const handsGroup = document.querySelector("#clock .hands");
  handsGroup.appendChild(secHand);

  // 時計の更新関数
  function updateClock() {
    let now = new Date(); // Current time
    let sec = now.getSeconds(); // Seconds
    let min = now.getMinutes() + sec / 60; // Fractional minutes
    let hour = (now.getHours() % 12) + min / 60; // Fractional hours
    let minangle = min * 6; // 6 degrees per minute
    let hourangle = hour * 30; // 30 degrees per hour
    let secangle = sec * 6;

    // Get SVG elements for the hands of the clock
    let minhand = document.querySelector("#clock .minutehand");
    let hourhand = document.querySelector("#clock .hourhand");
    let sechand = document.querySelector("#clock .sechand");

    // Set an SVG attribute on them to move them around the clock face
    minhand.setAttribute("transform", `rotate(${minangle}, 50, 50)`);
    hourhand.setAttribute("transform", `rotate(${hourangle}, 50, 50)`);
    sechand.setAttribute("transform", `rotate(${secangle}, 50, 50)`);

    // Run this function again in 1 second
    setTimeout(updateClock, 1000);
  }

  // 初回の時計の更新を行う
  updateClock();
});
