import { readdir, stat } from "fs/promises";
import { join, resolve } from "path";

type resultObj = {
  path: string;
  isDirectory: boolean;
};

export async function* walk(rootPath: string): AsyncGenerator<resultObj> {
  const absolutePath = resolve(rootPath); // パスを絶対パスに変換(最初から絶対パスで書いたほうがわかりやすい)
  const items = await readdir(absolutePath);
  for (const item of items) {
    const itemPath = join(rootPath, item);
    const stats = await stat(itemPath);
    const isDirectory = stats.isDirectory();
    yield { path: itemPath, isDirectory: isDirectory };
    if (isDirectory) {
      yield* walk(itemPath);
    }
  }
}
