import AnalogClock from "./component/AnalogClock";
import DateDisplay from "./component/DateDisplay";
import DigitalClock from "./component/DigitalClock";
import "./index.css";

function App2() {
  const connectServer = () => {
    fetch("https://165e-34-125-152-209.ngrok-free.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt:
          "<lora:hatsunemiku1:1>solo,outdoors,smile,upper body,(portrait:2),cheek-to-cheek,looking at viewer,facing viewer,hatsune miku,absurdly long hair,aqua hair,twintails,hair ornament,sidelocks,hair between eyes,parted bangs,aqua eyes,white shirt,collared shirt,bare shoulders,sleeveless shirt,aqua necktie,detached sleeves,black sleeves,shoulder tattoo,fringe,black thighhighs,miniskirt,pleated skirt,zettai ryouiki,thigh boots",
        negative_prompt:
          "(score_5,score_4,score_3,score_2,score_1),(worst quality, low quality:1.3),dark skin,extra arms,extra legs,monochrome,greyscale,render,old,wrinkles,ugly,bad,wrong,horror,watermark,subtitled",
        height: 768,
        width: 512,
        guidance_scale: 8,
        num_inference_steps: 40,
        seed: -1,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("サーバーエラー: " + response.status);
        }
        return response.blob(); // Blob形式で画像を受け取る
      })
      .then((blob) => {
        // BlobからURLを作成
        const imgURL = URL.createObjectURL(blob);

        // HTMLの<img>要素に画像を設定
        const imgElement = document.createElement("img");
        imgElement.src = imgURL;
        imgElement.alt = "Generated Image";
        imgElement.style.maxWidth = "100%"; // 表示サイズを制限
        imgElement.style.border = "1px solid #ccc"; // デザインのための枠線を追加

        // 画像を表示するためのHTML要素に追加
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = ""; // 古い内容をクリア
        outputDiv.appendChild(imgElement);
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error);

        // エラーメッセージを表示
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = `<p style="color:red;">画像の生成に失敗しました: ${error.message}</p>`;
      });
  };


  return (
    <div className="relative min-h-screen bg-gradient-to-r from-sky-300 via-teal-400 to-sky-600 animate-gradient">
      <div className="absolute inset-0 bg-noise opacity-10" style={{ zIndex: -1 }}></div>
      <div className="grid grid-rows-2 grid-cols-2 gap-6 p-10">
        <div className="row-span-2 flex justify-center items-center">
          <AnalogClock />
        </div>
        <div className="flex justify-end items-center">
          <DateDisplay />
        </div>
        <div className="flex justify-end items-center">
          <DigitalClock />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-700 transition-all"
          onClick={ connectServer}
        >
          画像を生成
        </button>
      </div>
      <div id="output" className="mt-6 text-center"></div>
    </div>
  );
}

