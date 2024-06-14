import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
export async function fetchFirstFileSize(path) {
  const files = await readdir(path);
  if (files.length === 0) {
    return null;
  }
  console.log(files[0]);
  const stats = await stat(join(path, files[0]));
  console.log(stats.size);
  return stats.size;
}

export async function fetchSumOfFileSizes(path) {
  const files = await readdir(path);
  let total = 0;
  for (const file of files) {
    const stats = await stat(join(path, file));
    total += stats.size;
  }
  return total;
}
