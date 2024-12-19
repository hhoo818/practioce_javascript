import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Timer = (props) => {
  const [hours, setHours] = useState(0); // 時間
  const [minutes, setMinutes] = useState(0); // 分
  const [seconds, setSeconds] = useState(0); // 秒
  const [remainingTime, setRemainingTime] = useState(0); // 秒単位の残り時間
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0 && isRunning) {
      clearInterval(interval);
      props.setIsTriggered(true); // タイマー終了を通知
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, remainingTime, props]);

  const handleStart = () => {
    if (remainingTime === 0) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      setRemainingTime(totalSeconds);
    }
    props.setIsTriggered(false);
    setIsRunning(true);
  };

  const formatTime = (time) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div
      className={`flex justify-center min-h-80 ${
        props.theme === "miku" ? "text-teal-200" : "text-amber-200"
      } bg-white/20 p-6 rounded-xl shadow-lg backdrop-blur-md items-center`}
    >
      <div
        className={`flex flex-col items-center space-y-4 py-4 px-8 bg-gradient-to-r ${
          props.theme === "miku"
            ? "from-cyan-500 to-sky-700"
            : "from-yellow-500 to-orange-700"
        } rounded-md text-center shadow-md`}
      >
        <h2
          className={`text-2xl font-semibold ${
            props.theme === "miku" ? "text-teal-100" : "text-amber-100"
          }`}
        >
          タイマー
        </h2>
        <div className="flex space-x-2">
          <input
            type="number"
            min="0"
            placeholder="時"
            value={hours}
            onChange={(e) =>
              setHours(Math.max(0, parseInt(e.target.value, 10) || 0))
            }
            className={`w-20 p-2 rounded-md shadow-md text-center ${
              props.theme === "miku" ? "text-teal-800" : "text-amber-800"
            }`}
          />
          <input
            type="number"
            min="0"
            placeholder="分"
            value={minutes}
            onChange={(e) =>
              setMinutes(Math.max(0, parseInt(e.target.value, 10) || 0))
            }
            className={`w-20 p-2 rounded-md shadow-md text-center ${
              props.theme === "miku" ? "text-teal-800" : "text-amber-800"
            }`}
          />
          <input
            type="number"
            min="0"
            placeholder="秒"
            value={seconds}
            onChange={(e) =>
              setSeconds(Math.max(0, parseInt(e.target.value, 10) || 0))
            }
            className={`w-20 p-2 rounded-md shadow-md text-center ${
              props.theme === "miku" ? "text-teal-800" : "text-amber-800"
            }`}
          />
        </div>
        <div
          className={`text-xl font-bold ${
            props.theme === "miku" ? "text-teal-100" : "text-amber-100"
          }`}
        >
          {formatTime(remainingTime)}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-hatsuneMikuGreen text-white font-semibold rounded-full shadow-md hover:bg-green-400"
          >
            スタート
          </button>
          <button
            onClick={() => setIsRunning(false)}
            className="px-4 py-2 bg-hatsuneMikuPink text-white font-semibold rounded-full shadow-md hover:bg-red-400"
          >
            ストップ
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setRemainingTime(0);
              setHours(0);
              setMinutes(0);
              setSeconds(0);
            }}
            className="px-4 py-2 bg-hatsuneMikuBule text-white font-semibold rounded-full shadow-md hover:bg-blue-400"
          >
            リセット
          </button>
        </div>
        <button
          onClick={props.onClose}
          className={`mt-4 px-4 py-2 font-semibold rounded-full shadow-md hover:bg-opacity-90 ${
            props.theme === "miku"
              ? "bg-gray-600 text-teal-200 hover:bg-gray-500"
              : "bg-gray-600 text-amber-200 hover:bg-gray-500"
          }`}
        >
          戻る
        </button>
      </div>
    </div>
  );
};

Timer.propTypes = {
  onClose: PropTypes.func.isRequired,
  setIsTriggered: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Timer;
