import crypto from "crypto";
import fs from "fs/promises";
// ここを埋める

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  return crypto.randomBytes(32);
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  const iv = crypto.randomBytes(16);
  // 暗号化とBase64エンコード
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  // 暗号化を実行
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  const encryptedBase64 = encrypted.toString("base64");

  // 暗号文とIVをbase64で返す
  return {
    value: encryptedBase64,
    iv: iv.toString("base64"),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  await fs.writeFile(
    "generateKey.json",
    JSON.stringify({ key: key.toString("base64") })
  );
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  await fs.writeFile("encrypt64.json", JSON.stringify(data));
}

async function readKey() {
  const keyData = await fs.readFile("generateKey.json", "utf8");
  const { key } = JSON.parse(keyData);
  return Buffer.from(key, "base64");
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  const encryptedData = await fs.readFile("encrypt64.json", "utf8");
  return JSON.parse(encryptedData);
}

// 復号して平文を返す
function decrypt64(data, key) {
  const iv = Buffer.from(data.iv, "base64");
  const encryptedText = Buffer.from(data.value, "base64");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  // 復号を実行
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decrypted.toString();
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = "Hello, World!";

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();
