import { walk } from "./index.ts";
import { join } from "path";

describe("テスト", () => {
  test("test", async () => {
    const testpath =
      "C:\\Users\\r00528257\\OneDrive - Ricoh\\ドキュメント\\javascript講座\\練習問題\\exercises-main-exercises\\exercises\\exercises\\ch13\\ex13\\test";
    const dir1 = join(testpath, "A");
    const dir2 = join(testpath, "B");
    const dir3 = join(dir2, "C");
    const expectedResult = [
      { path: dir1, isDirectory: true },
      { path: dir2, isDirectory: true },
      { path: dir3, isDirectory: true },
      { path: join(dir3, "buz.txt"), isDirectory: false },
      { path: join(dir2, "foo.txt"), isDirectory: false },
    ];
    let count = 0;
    for await (const item of walk(testpath)) {
      expect(item).toEqual(expectedResult[count]);
      count++;
    }
  });
});
