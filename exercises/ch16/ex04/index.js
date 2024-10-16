import fs from "fs";
import iconv from "iconv-lite";

const path = "./hello.txt";

try {
  const data = fs.readFileSync(path);
  const decodedData = iconv.decode(data, "Shift_JIS"); // Shift_JISからUTF-8に変換
  console.log(decodedData);
} catch (err) {
  console.error(err);
}