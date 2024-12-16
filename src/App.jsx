import { useState } from "react";
import DigitalClockWithDate from "./component/DigitalClockWithDate";
import AnalogClockWithDate from "./component/AnalogClockWithDate";
import changeImage from "./item/change.png";
import Menu from "./component/Menu";

const App = () => {
  const [isAnalog, setIsAnalog] = useState(true);
  const [theme, setTheme] = useState("miku"); // テーマの状態: "miku" または "rin-len"

  // アラーム用のstate
  const [isActive, setIsActive] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  // タイマーのstate
  const [isTriggered2, setIsTriggered2] = useState(false);

  const toggleClock = () => {
    setIsAnalog(!isAnalog);
  };

  return (
    <div
      className={`min-h-screen relative bg-gradient-to-r ${
        theme === "miku"
          ? " from-sky-300 via-teal-400 to-sky-600"
          : " from-yellow-300 via-orange-400 to-yellow-600"
      }`}
    >
      <div
        className="absolute inset-0 bg-noise opacity-10"
        style={{ zIndex: -1 }}
      ></div>
      <div className="grid grid-cols-2 gap-8 p-16 items-center">
        {/* 左側: 時計エリア */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-96 h-96 flex items-center justify-center">
            <button
              onClick={toggleClock}
              className={`absolute top-0 left-3 px-1 py-1 ${
                theme === "miku"
                  ? "bg-teal-600 hover:bg-teal-500"
                  : "bg-yellow-600 hover:bg-yellow-500"
              } text-white font-semibold rounded-full shadow-md`}
              style={{ zIndex: 1 }}
            >
              <img src={changeImage} className="w-4 h-4"></img>
            </button>
            {isAnalog ? (
              <AnalogClockWithDate theme={theme} />
            ) : (
              <DigitalClockWithDate theme={theme} />
            )}
          </div>
        </div>

        {/* 右側: 初音ミク画像 */}
        <div className="flex justify-center items-center">
          <img
            src={
              theme === "miku"
                ? "https://example.com/hatsune-miku.png" // 初音ミクの画像URL
                : "https://example.com/kagamine-rin-len.png" // 鏡音リン・レンの画像URL
            }
            alt={theme === "miku" ? "初音ミク" : "鏡音リンとレン"}
            className="rounded-xl shadow-lg max-w-full max-h-[600px] bg-white/20 backdrop-blur-sm"
          />
        </div>
      </div>

      {isTriggered && isActive && (
        <div className="flex flex-col  items-center space-y-4 py-4 px-8 bg-gradient-to-r from-cyan-500 rounded-md text-center shadow-md">
          <div className="text-pink-400 font-bold text-lg">
            アラームが鳴っています！
            <button
              onClick={() => {
                setIsActive(false);
                setIsTriggered(false);
              }}
              className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-full shadow-md hover:bg-teal-500"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {isTriggered2 && (
        <div className="flex flex-col  items-center space-y-4 py-4 px-8 bg-gradient-to-r from-cyan-500 rounded-md text-center shadow-md">
          <div className="text-pink-400 font-bold text-lg">
            タイマーが鳴っています！
            <button
              onClick={() => {
                setIsActive(false);
                setIsTriggered2(false);
              }}
              className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-full shadow-md hover:bg-teal-500"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* メニュー */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <Menu
          isActive={isActive}
          setIsActive={setIsActive}
          isTriggered={isTriggered}
          setIsTriggered={setIsTriggered}
          setIsTriggered2={setIsTriggered2}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
    </div>
  );
};

export default App;
