import { useState, useEffect } from "react";
import PropTypes from "prop-types";
const DigitalClockWithDate = (props) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) =>
    time.toLocaleTimeString("en-US", { hour12: false });

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

  return (
    <div
      className={`flex flex-col items-center bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md ${
        props.theme === "miku" ? "text-teal-200" : "text-amber-200"
      }  font-semibold text-xl`}
    >
      <div
        className={`text-6xl font-bold ${
          props.theme === "miku" ? "text-pink-400 glow" : "text-pink-400 glow"
        }`}
      >
        {formatTime(time)}
      </div>
      <div className="mt-4 text-center">{formatDate(time)}</div>
    </div>
  );
};

DigitalClockWithDate.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default DigitalClockWithDate;
