const DateDisplay = () => {
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="bg-white/10 p-4 rounded-xl shadow-lg backdrop-blur-md text-center text-teal-200 font-semibold text-lg">
      <h2>{today.toLocaleDateString("en-US", options)}</h2>
    </div>
  );
};

export default DateDisplay;
