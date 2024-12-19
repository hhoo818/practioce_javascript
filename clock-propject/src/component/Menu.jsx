import { useState } from "react";
import Alarm from "./Alarm";
import PropTypes from "prop-types";
import Timer from "./Timer";
import GeneratePic from "./GeneratePic";
import {
  generatePicture,
  getPromptByTime,
  hatsuneMikuPrompt,
  kagamineRenPrompt,
  kagamineRinPrompt,
  NegativeWord,
} from "./generatePicture";

// propTypesの正しい定義
/*
MenuIndex.propTypes = {
  setIsShowAlarm: PropTypes.func.isRequired,
};
*/

const Menu = (props) => {
  const [loading, setLoading] = useState(false); // ローディング状態を管理
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [isShowAlarm, setIsShowAlarm] = useState(false);
  const [isShowTimer, setIsShowTimer] = useState(false);
  const [isShowMenuIndex, setIsShowMenuIndex] = useState(true);
  const [isShowThemeChange, setIsShowThemeChange] = useState(false);
  const [isShowGenerate, setIsShowGenerate] = useState(false);
  const [isShowRefresh, setIsShowRefresh] = useState(false);
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
  const openGenerate = () => {
    setIsShowGenerate(true);
    setIsShowMenuIndex(false);
  };
  const closeGenerate = () => {
    setIsShowGenerate(false);
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

      <div
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
            ></div>
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
                    onClick={async () => {
                      props.setTheme("miku");
                      const prompt = getPromptByTime("miku");
                      const result = await generatePicture({
                        prompt: prompt,
                        negative_prompt: NegativeWord,
                        height: 768,
                        width: 512,
                      });
                      props.setImageElement(result);
                    }}
                  >
                    初音ミク
                  </button>
                  <button
                    className={`min-w-[100px] p-4 bg-gradient-to-r ${
                      props.theme === "miku"
                        ? "from-cyan-500 to-sky-700"
                        : "from-yellow-500 to-orange-700"
                    } rounded-md text-center shadow-md flex-1`}
                    onClick={async () => {
                      props.setTheme("kagamine");
                      const prompt = getPromptByTime("kagamine");
                      const result = await generatePicture({
                        prompt: prompt,
                        negative_prompt: NegativeWord,
                        height: 768,
                        width: 512,
                      });
                      props.setImageElement(result);
                    }}
                  >
                    鏡音リン&レン
                  </button>
                </div>
              )}
            </button>
            <button
              className={`p-4 bg-gradient-to-r ${
                props.theme === "miku"
                  ? "from-cyan-500 to-sky-700"
                  : "from-yellow-500 to-orange-700"
              } rounded-md text-center shadow-md`}
              onClick={() => setIsShowRefresh(!isShowRefresh)}
            >
              イラスト入れ替え
              {isShowRefresh && (
                <div
                  className="flex gap-2 justify-center w-full mx-auto mt-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                      {/* スピナー */}
                      <div className="w-8 h-8 border-4 border-t-transparent border-white-500 rounded-full animate-spin"></div>
                    </div>
                  )}
                  <button
                    className={`min-w-[100px] p-4 bg-gradient-to-r ${
                      props.theme === "miku"
                        ? "from-cyan-500 to-sky-700"
                        : "from-yellow-500 to-orange-700"
                    } rounded-md text-center shadow-md flex-1`}
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const prompt =
                          props.theme === "miku"
                            ? hatsuneMikuPrompt.morning
                            : kagamineRinPrompt.morning;
                        const result = await generatePicture({
                          prompt: prompt,
                          negative_prompt: NegativeWord,
                          height: 768,
                          width: 512,
                        });
                        props.setImageElement(result);
                      } catch (error) {
                        console.error(
                          "Error generating picture (Morning):",
                          error
                        );
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    朝
                  </button>
                  <button
                    className={`min-w-[100px] p-4 bg-gradient-to-r ${
                      props.theme === "miku"
                        ? "from-cyan-500 to-sky-700"
                        : "from-yellow-500 to-orange-700"
                    } rounded-md text-center shadow-md flex-1`}
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const prompt =
                          props.theme === "miku"
                            ? hatsuneMikuPrompt.lunch
                            : kagamineRinPrompt.lunch;
                        const result = await generatePicture({
                          prompt: prompt,
                          negative_prompt: NegativeWord,
                          height: 768,
                          width: 512,
                        });
                        props.setImageElement(result);
                      } catch (error) {
                        console.error(
                          "Error generating picture (Lunch):",
                          error
                        );
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    昼
                  </button>
                  <button
                    className={`min-w-[100px] p-4 bg-gradient-to-r ${
                      props.theme === "miku"
                        ? "from-cyan-500 to-sky-700"
                        : "from-yellow-500 to-orange-700"
                    } rounded-md text-center shadow-md flex-1`}
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const prompt =
                          props.theme === "miku"
                            ? hatsuneMikuPrompt.night
                            : kagamineRenPrompt.night;
                        const result = await generatePicture({
                          prompt: prompt,
                          negative_prompt: NegativeWord,
                          height: 768,
                          width: 512,
                        });
                        props.setImageElement(result);
                      } catch (error) {
                        console.error(
                          "Error generating picture (Night):",
                          error
                        );
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    夜
                  </button>
                  <button
                    className={`min-w-[100px] p-4 bg-gradient-to-r ${
                      props.theme === "miku"
                        ? "from-cyan-500 to-sky-700"
                        : "from-yellow-500 to-orange-700"
                    } rounded-md text-center shadow-md flex-1`}
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const prompt =
                          props.theme === "miku"
                            ? hatsuneMikuPrompt.midNight
                            : kagamineRenPrompt.midNight;
                        const result = await generatePicture({
                          prompt: prompt,
                          negative_prompt: NegativeWord,
                          height: 768,
                          width: 512,
                        });
                        props.setImageElement(result);
                      } catch (error) {
                        console.error(
                          "Error generating picture (MidNight):",
                          error
                        );
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    深夜
                  </button>
                </div>
              )}
            </button>
            <button
              className={`p-4 bg-gradient-to-r ${
                props.theme === "miku"
                  ? "from-cyan-500 to-sky-700"
                  : "from-yellow-500 to-orange-700"
              } rounded-md text-center shadow-md`}
              onClick={openGenerate}
            >
              好きに画像生成
            </button>
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
            isOn={props.isOn}
            setIsOn={props.setIsOn}
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
        <div
          className={`  ${
            isShowGenerate ? "block opacity-100" : "hidden opacity-0"
          }`}
        >
          <GeneratePic
            setIsShowDialog={props.setIsShowDialog}
            setLoading={props.setLoading}
            setImageContent={props.setImageContent}
            theme={props.theme}
            onClose={closeGenerate}
          ></GeneratePic>
        </div>
      </div>
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
  setImageContent: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsShowDialog: PropTypes.func.isRequired,
  setImageElement: PropTypes.func.isRequired,
  isOn: PropTypes.bool.isRequired,
  setIsOn: PropTypes.func.isRequired,
};

export default Menu;
