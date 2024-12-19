import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AnalogClockWithDate = (props) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const radius = 120;
  const center = radius;
  const hour =
    ((time.getHours() % 12) / 12) * 360 + (time.getMinutes() / 60) * 30 - 90;
  const minute = (time.getMinutes() / 60) * 360 - 90;
  const second = (time.getSeconds() / 60) * 360 - 90;

  // 色をテーマに応じて動的に変更
  const primaryColor = props.theme === "miku" ? "#00d1ff" : "#FFD700";
  const hourColor = props.theme === "miku" ? "#39c5bb" : "#FFA400";
  const minuteColor = props.theme === "miku" ? "#00b2ff" : "#FFE211";
  const secondColor = props.theme === "miku" ? "#ff3399" : "#FFA500";

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    };

    const formattedDate = date.toLocaleDateString("ja-JP", options);
    const [year, month, day] = formattedDate.split("/");
    return `${year}/${month}/${day}`;
  };

  // 文字盤の数字を生成
  const generateNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 12; i++) {
      const angle = ((i / 12) * 360 - 90) * (Math.PI / 180);
      const x = center + (radius - 20) * Math.cos(angle); 
      const y = center + (radius - 20) * Math.sin(angle);
      numbers.push(
        <text
          key={i}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          fill={primaryColor}
        >
          {i}
        </text>
      );
    }
    return numbers;
  };

  return (
    <div className="flex flex-col items-center bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md text-teal-200">
      <div
        className={`relative w-80 h-80 rounded-full shadow-2xl p-3 ${
          props.theme === "miku"
            ? "bg-gradient-to-r from-cyan-500 to-sky-700"
            : "bg-gradient-to-r from-yellow-400 to-orange-500"
        }`}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          className="relative z-10"
        >
          {/* 時計の外円 */}
          <circle
            cx={center}
            cy={center}
            r={radius - 6}
            fill="url(#gradient-bg)"
            stroke={primaryColor}
            strokeWidth="9"
          />
          {/* 文字盤の数字 */}
          {generateNumbers()}
          {/* 時針 */}
          <line
            x1={center}
            y1={center}
            x2={center + 60 * Math.cos((hour * Math.PI) / 180)}
            y2={center + 60 * Math.sin((hour * Math.PI) / 180)}
            stroke={hourColor}
            strokeWidth="9"
          />
          {/* 分針 */}
          <line
            x1={center}
            y1={center}
            x2={center + 84 * Math.cos((minute * Math.PI) / 180)}
            y2={center + 84 * Math.sin((minute * Math.PI) / 180)}
            stroke={minuteColor}
            strokeWidth="6"
          />
          {/* 秒針 */}
          <line
            x1={center}
            y1={center}
            x2={center + 96 * Math.cos((second * Math.PI) / 180)}
            y2={center + 96 * Math.sin((second * Math.PI) / 180)}
            stroke={secondColor}
            strokeWidth="3"
            className="animate-glow"
          />
        </svg>
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            props.theme === "miku"
              ? "from-cyan-300 via-sky-500 to-teal-500"
              : "from-yellow-700 via-amber-700 to-orange-700"
          } rounded-full blur-xl opacity-40`}
        ></div>
      </div>
      <div
        className={`mt-6 text-center font-semibold text-xl ${
          props.theme === "miku" ? "text-teal-200" : "text-amber-200"
        }`}
      >
        {formatDate(time)}
      </div>
    </div>
  );
};

AnalogClockWithDate.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default AnalogClockWithDate;
