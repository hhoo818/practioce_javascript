import { Hiragana } from "./index.js";

const hiraganas = Array.from({ length: 0x3093 - 0x3041 + 1 }, (_, i) =>
  String.fromCharCode(0x3041 + i)
).filter((char) => char.match(/^[\u3041-\u3093\u3094\u3095\u3096]$/));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

test("並び替え", () => {
  const sorted2 = ["い", "あ", "う"]
    .map((char) => new Hiragana(char))
    .sort((a, b) => a - b);

  const resultArray = sorted2.map((val) => {
    return val.character;
  });
  expect(resultArray).toEqual(["あ", "い", "う"]);
});
