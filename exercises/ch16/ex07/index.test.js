import path from "path";
import { checkEntry } from "./index.js";

describe("checkEntry", () => {
  const testDir = path.join(__dirname, "testDir");
  const testFile = path.join(testDir, "testFile.txt");
  test("ディレクトリが認識できる", () => {
    const result = checkEntry(testDir);
    expect(result).toBe("directory");
  });
  test("ファイルが認識できる", () => {
    const result = checkEntry(testFile);
    expect(result).toBe("file");
  });
});
