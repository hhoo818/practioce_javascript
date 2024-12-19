import { useState, useEffect, useRef } from "react";
import DigitalClockWithDate from "./component/DigitalClockWithDate";
import AnalogClockWithDate from "./component/AnalogClockWithDate";
import changeImage from "./item/change.png";
import Menu from "./component/Menu";
import Dialog from "./component/Dialog";
import sound1 from "./lib/sound/Kitchen_Timer.mp3"

import {
  generatePicture,
  getPromptByTime,
  NegativeWord,
} from "./component/generatePicture";

const App = () => {
  const [isAnalog, setIsAnalog] = useState(true);
  const [theme, setTheme] = useState("miku"); // テーマの状態: "miku" または "rin-len"

  // アラーム用のstate
  const [isActive, setIsActive] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isOn, setIsOn] = useState(false);
  // タイマーのstate
  const [isTriggered2, setIsTriggered2] = useState(false);

  // ダイアログ用のstate
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [imageContent, setImageContent] = useState(null);
  const [imageElement, setImageElement] = useState(null);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);
  const alarmAudio = useRef(null); // 音声を保持するためのref
  const toggleClock = () => {
    setIsAnalog(!isAnalog);
  };



  // 画像生成関数
  useEffect(() => {
    alarmAudio.current = new Audio(sound1); // 音声ファイルを読み込む
    alarmAudio.current.loop = true; // ループ設定

    // アラームが鳴っている場合
    if ((isTriggered && isActive) || isTriggered2) {
      alarmAudio.current.play().catch((err) => {
        console.error("自動再生エラー:", err);
      });
    } else {
      // アラームが停止した場合、音声を停止
      alarmAudio.current.pause();
      alarmAudio.current.currentTime = 0;
    }
  
    const fetchImage = async () => {
      const prompt = getPromptByTime(theme); // 時間帯に応じた prompt を取得
      const result = await generatePicture({
        prompt: prompt,
        negative_prompt: NegativeWord,
        height: 768,
        width: 552,
      });
      setImageElement(result);
    };
    // ページを開いた瞬間に画像を生成
    if (!hasFetched.current) {
      fetchImage(); // 初回実行
      hasFetched.current = true;
    }
    // 次のちょうどの時間までの待機時間を計算
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setMinutes(0);
    nextHour.setSeconds(0);
    nextHour.setMilliseconds(0);
    nextHour.setHours(now.getHours() + 1); // 次の時間の00分00秒

    const timeUntilNextHour = nextHour - now;

    const timeoutId = setTimeout(() => {
      // その後は1時間ごとに fetchImage を実行
      const intervalId = setInterval(fetchImage, 60 * 60 * 1000); // 1時間ごと
      // クリーンアップ: interval を管理
      return () => clearInterval(intervalId);
    }, timeUntilNextHour);

    // クリーンアップ: timeout を管理
    return () => {clearTimeout(timeoutId)
      if (alarmAudio.current) {
        alarmAudio.current.pause();
        alarmAudio.current.currentTime = 0;
      }
    };
  }, [isActive, isTriggered, isTriggered2, theme]);

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
        <div className="flex justify-center items-center h-[550px]">
          {imageElement || <p>画像を読み込み中...</p>}
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
                setIsOn(false)
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

      <Dialog
        title={"生成イラスト"}
        isOpen={isShowDialog}
        onClose={() => {
          setIsShowDialog(false);
        }}
      >
        {loading ? (
          <p>Loading...</p> 
        ) : (
          imageContent || <p>No image to display</p> 
        )}
      </Dialog>

    
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <Menu
          isActive={isActive}
          setIsActive={setIsActive}
          isTriggered={isTriggered}
          setIsTriggered={setIsTriggered}
          setIsTriggered2={setIsTriggered2}
          theme={theme}
          setTheme={setTheme}
          setImageContent={setImageContent}
          setLoading={setLoading}
          setIsShowDialog={setIsShowDialog}
          setImageElement={setImageElement}
          isOn={isOn}
          setIsOn={setIsOn}
        />
      </div>
    </div>
  );
};

export default App;
