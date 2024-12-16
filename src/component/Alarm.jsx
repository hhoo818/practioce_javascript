import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ToggleSwitch from "./ToggleSwitch";

const Alarm = (props) => {
  const [targetTime, setTargetTime] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (
        props.isActive &&
        targetTime &&
        `${currentTime.getHours()}:${currentTime.getMinutes()}` === targetTime
      ) {
        props.setIsTriggered(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [props.isActive, targetTime, currentTime, props]);

  const handleSetTime = (e) => {
    setTargetTime(e.target.value);
    props.setIsTriggered(false);
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
          タイマー設定
        </h2>
        <input
          type="time"
          className={`p-2 rounded-md shadow-md ${
            props.theme === "miku" ? "text-teal-800" : "text-amber-800"
          }`}
          value={targetTime}
          onChange={handleSetTime}
        />
        <ToggleSwitch
          onOn={() => {
            props.setIsActive(true);
          }}
          onOff={() => {
            props.setIsActive(false);
          }}
        />
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

Alarm.propTypes = {
  onClose: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
  isTriggered: PropTypes.bool.isRequired,
  setIsTriggered: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Alarm;
