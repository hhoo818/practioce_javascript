import PropTypes from "prop-types";

const ToggleSwitch = (props) => {

  const handleToggle = () => {
    if (!props.isOn) {
      props.onOn();
    } else {
      props.onOff();
    }
    props.setIsOn((prevState) => !prevState);
  };

  return (
    <div className="flex items-center font-sans">
      <div className="relative w-16 h-8 mr-3">
        <input
          type="checkbox"
          id="toggle_switch"
          checked={props.isOn}
          onChange={handleToggle}
          className="absolute w-0 h-0 opacity-0"
        />
        <label
          htmlFor="toggle_switch"
          className={`block cursor-pointer absolute inset-0 rounded-full transition-all duration-400 shadow-inner 
            ${props.isOn ? "bg-emerald-500" : "bg-gray-300"}
          `}
        ></label>
        <span
          className={`block absolute h-6 w-6 bg-white rounded-full shadow-md transition-transform duration-400 transform translate-y-1
            ${props.isOn ? "translate-x-8" : "translate-x-1"}
          `}
        ></span>
      </div>
      <span
        className={`text-lg font-bold ${
          props.isOn ? "text-emerald-600" : "text-gray-800"
        }`}
      >
        {props.isOn ? "ON" : "OFF"}
      </span>
    </div>
  );
};

ToggleSwitch.propTypes = {
  onOn: PropTypes.func,
  onOff: PropTypes.func,
    isOn:PropTypes.bool.isRequired,
    setIsOn: PropTypes.func.isRequired
};

export default ToggleSwitch;
