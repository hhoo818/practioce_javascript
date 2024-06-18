import { walk } from "./index.ts";
import { join } from "path";

describe("テスト", () => {
  test("test", () => {
    const testpath =
      "C:\\Users\\r00528257\\OneDrive - Ricoh\\ドキュメント\\javascript講座\\練習問題\\exercises-main-exercises\\exercises\\exercises\\ch12\\ex06\\test1";
    const dir1 = join(testpath, "test2");
    const dir2 = join(testpath, "test3");
    const expectedResult = [
      { path: dir1, isDirectory: true },
      { path: dir2, isDirectory: true },
      { path: join(dir2, "aaa.html"), isDirectory: false },
      { path: join(dir2, "aaa.md"), isDirectory: false },
    ];
    const result = Array.from(walk(testpath));

    expect(result.sort((a, b) => a.path.localeCompare(b.path))).toEqual(
      expectedResult.sort((a, b) => a.path.localeCompare(b.path))
    );
  });
});
