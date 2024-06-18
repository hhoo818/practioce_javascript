import { readdir, stat } from "node:fs/promises";
import { join } from 'path';

async function fetchSumOfFileSizes(path) {
  const files = await readdir(path);
  const fileStatPromises = files.map(file => stat(join(path, file)));
  const stats = await Promise.all(fileStatPromises);
  const totalSize = stats.reduce((total, stat) => total + stat.size, 0);
  return totalSize;
}