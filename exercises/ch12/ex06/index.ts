import { readdirSync, statSync } from "fs";
import { join, resolve } from "path";

type resultObj = {
  path: string;
  isDirectory: boolean;
};

export function* walk(rootPath: string): Generator<resultObj> {
  const absolutePath = resolve(rootPath); // パスを絶対パスに変換(最初から絶対パスで書いたほうがわかりやすい)
  const items = readdirSync(absolutePath);
  for (const item of items) {
    const itemPath = join(rootPath, item);
    const isDirectory = statSync(itemPath).isDirectory();
    yield { path: itemPath, isDirectory: isDirectory };
    if (isDirectory) {
      yield* walk(itemPath);
    }
  }
}
