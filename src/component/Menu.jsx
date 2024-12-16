import { useState } from "react";
import Alarm from "./Alarm";
import PropTypes from "prop-types";
import Timer from "./Timer";

// propTypesの正しい定義
/*
MenuIndex.propTypes = {
  setIsShowAlarm: PropTypes.func.isRequired,
};
*/

const Menu = (props) => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [isShowAlarm, setIsShowAlarm] = useState(false);
  const [isShowTimer, setIsShowTimer] = useState(false);
  const [isShowMenuIndex, setIsShowMenuIndex] = useState(true);
  const [isShowThemeChange, setIsShowThemeChange] = useState(true);
  const toggleMenu = () => {
    setMenuExpanded(!menuExpanded);
  };
  const openAlarm = () => {
    setIsShowAlarm(true);
    setIsShowMenuIndex(false);
  };
  const closeAlarm = () => {
    setIsShowMenuIndex(true);
    setIsShowAlarm(false);
  };
  const openTimer = () => {
    setIsShowTimer(true);
    setIsShowMenuIndex(false);
  };
  const closeTimer = () => {
    setIsShowTimer(false);
    setIsShowMenuIndex(true);
  };
  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={toggleMenu}
          className={`px-4 py-2  text-white font-semibold rounded-full shadow-md ${
            props.theme === "miku"
              ? "bg-teal-600 hover:bg-teal-500"
              : "bg-amber-600 hover:bg-amber-500"
          } `}
        >
          {menuExpanded ? "閉じる" : "メニューを展開"}
        </button>
      </div>

      <dev
        className={`  ${
          menuExpanded ? "block opacity-100" : "hidden opacity-0"
        }`}
      >
        {isShowMenuIndex && (
          <div
            className={`mt-4 min-h-80 bg-white/20 p-6 rounded-xl shadow-lg backdrop-blur-md ${
              props.theme === "miku" ? "text-teal-200" : "text-amber-200"
            } grid grid-cols-2 gap-4`}
          >
            <button
              className={`p-4 bg-gradient-to-r ${
                props.theme === "miku"
                  ? "from-cyan-500 to-sky-700"
                  : "from-yellow-500 to-orange-700"
              }  rounded-md text-center shadow-md`}
              onClick={openAlarm}
            >
              アラーム
            </button>
            <button
              className={`p-4 bg-gradient-to-r ${
                props.theme === "miku"
                  ? "from-cyan-500 to-sky-700"
                  : "from-yellow-500 to-orange-700"
              } rounded-md text-center shadow-md`}
              onClick={openTimer}
            >
              タイマー
            </button>
            <div
              className={`p-4 bg-gradient-to-r ${
                props.theme === "miku"
                  ? "from-cyan-500 to-sky-700"
                  : "from-yellow-500 to-orange-700"
              } rounded-md text-center shadow-md`}
            >
              会話機能
            </div>
            <button
              className={`p-4 bg-gradient-to-r ${
                props.theme === "miku"
                  ? "from-cyan-500 to-sky-700"
                  : "from-yellow-500 to-orange-700"
              } rounded-md text-center shadow-md`}
              onClick={() => setIsShowThemeChange(!isShowThemeChange)}
            >
              テーマ入れ替え
              {isShowThemeChange && (
                <div
                  className="flex gap-2 justify-center w-full mx-auto mt-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={`min-w-[100px] p-4 bg-gradient-to-r ${
                      props.theme === "miku"
                        ? "from-cyan-500 to-sky-700"
                        : "from-yellow-500 to-orange-700"
                    } rounded-md text-center shadow-md flex-1`}
                    onClick={() => props.setTheme("miku")}
                  >
                    初音ミク
                  </button>
                  <button
                    className={`min-w-[100px] p-4 bg-gradient-to-r ${
                      props.theme === "miku"
                        ? "from-cyan-500 to-sky-700"
                        : "from-yellow-500 to-orange-700"
                    } rounded-md text-center shadow-md flex-1`}
                    onClick={() => props.setTheme("kagamine")}
                  >
                    鏡音リン&レン
                  </button>
                </div>
              )}
            </button>
            <div
              className={`p-4 bg-gradient-to-r ${
                props.theme === "miku"
                  ? "from-cyan-500 to-sky-700"
                  : "from-yellow-500 to-orange-700"
              } rounded-md text-center shadow-md`}
            ></div>
            <div
              className={`p-4 bg-gradient-to-r ${
                props.theme === "miku"
                  ? "from-cyan-500 to-sky-700"
                  : "from-yellow-500 to-orange-700"
              } rounded-md text-center shadow-md`}
            ></div>
          </div>
        )}

        <div
          className={`  ${
            isShowAlarm ? "block opacity-100" : "hidden opacity-0"
          }`}
        >
          <Alarm
            onClose={closeAlarm}
            isActive={props.isActive}
            isTriggered={props.isTriggered}
            setIsActive={props.setIsActive}
            setIsTriggered={props.setIsTriggered}
            theme={props.theme}
          />
        </div>
        <div
          className={`  ${
            isShowTimer ? "block opacity-100" : "hidden opacity-0"
          }`}
        >
          <Timer
            onClose={closeTimer}
            setIsTriggered={props.setIsTriggered2}
            theme={props.theme}
          />
        </div>
      </dev>
    </>
  );
};

Menu.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
  isTriggered: PropTypes.bool.isRequired,
  setIsTriggered: PropTypes.func.isRequired,
  setIsTriggered2: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export default Menu;
