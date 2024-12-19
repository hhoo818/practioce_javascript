import PropTypes from "prop-types";
import { useState } from "react";
import { generatePicture } from "./generatePicture";

const GeneratePic = (props) => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(768);
  const [widthWarning, setWidthWarning] = useState(""); // 幅の警告
  const [heightWarning, setHeightWarning] = useState(""); // 高さの警告

  const validateMultipleOf8 = (value) => {
    return value % 8 === 0;
  };

  const handleWidthChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setWidth(newValue);
    if (!validateMultipleOf8(newValue)) {
      setWidthWarning("幅は8の倍数である必要があります。");
    } else {
      setWidthWarning("");
    }
  };

  const handleHeightChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setHeight(newValue);
    if (!validateMultipleOf8(newValue)) {
      setHeightWarning("高さは8の倍数である必要があります。");
    } else {
      setHeightWarning("");
    }
  };

  const onclickGenerate = async () => {
    if (!validateMultipleOf8(width) || !validateMultipleOf8(height)) {
      alert("幅と高さは8の倍数である必要があります。");
      return;
    }
    props.setIsShowDialog(true);
    props.setLoading(true);
    const imageNode = await generatePicture({
      prompt,
      negative_prompt: negativePrompt,
      height,
      width,
    });
    props.setImageContent(imageNode);
    props.setLoading(false);
  };

  return (
    <div
      className={`flex justify-center min-h-80 ${
        props.theme === "miku" ? "text-teal-200" : "text-amber-200"
      } bg-white/20 p-6 rounded-xl shadow-lg backdrop-blur-md items-center`}
    >
      <div
        className={`flex flex-col items-center space-y-4 py-4 px-8 bg-gradient-to-r w-screen ${
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
          画像生成
        </h2>

        <input
          type="text"
          placeholder="Promptを入力"
          className={`w-full p-2 rounded-md shadow-md ${
            props.theme === "miku" ? "text-teal-800" : "text-amber-800"
          }`}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <input
          type="text"
          placeholder="Negative Promptを入力"
          className={`w-full p-2 rounded-md shadow-md ${
            props.theme === "miku" ? "text-teal-800" : "text-amber-800"
          }`}
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
        />

        <div className="w-full">
          <input
            type="number"
            placeholder="Width (px)"
            className={`w-full p-2 rounded-md shadow-md ${
              props.theme === "miku" ? "text-teal-800" : "text-amber-800"
            }`}
            value={width}
            onChange={handleWidthChange}
          />
          {widthWarning && (
            <p className="text-black-500 text-lg mt-1">{widthWarning}</p>
          )}
        </div>

        <div className="w-full">
          <input
            type="number"
            placeholder="Height (px)"
            className={`w-full p-2 rounded-md shadow-md ${
              props.theme === "miku" ? "text-teal-800" : "text-amber-800"
            }`}
            value={height}
            onChange={handleHeightChange}
          />
          {heightWarning && (
            <p className="text-black-500 text-lg mt-1">{heightWarning}</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onclickGenerate}
            className={`mt-2 px-4 py-2 font-semibold rounded-full shadow-md hover:bg-opacity-90 ${
              props.theme === "miku"
                ? "bg-gray-600 text-teal-200 hover:bg-gray-500"
                : "bg-gray-600 text-amber-200 hover:bg-gray-500"
            }`}
          >
            画像生成
          </button>

          <button
            onClick={props.onClose}
            className={`mt-2 px-4 py-2 font-semibold rounded-full shadow-md hover:bg-opacity-90 ${
              props.theme === "miku"
                ? "bg-gray-600 text-teal-200 hover:bg-gray-500"
                : "bg-gray-600 text-amber-200 hover:bg-gray-500"
            }`}
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );
};

GeneratePic.propTypes = {
  setIsShowDialog: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setImageContent: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GeneratePic;
