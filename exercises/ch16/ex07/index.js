import fs from "fs";

export function checkEntry(path, callback) {
  fs.stat(path, (err, stats) => {
    if (err) {
      return callback(err, null); // エラー時にはエラーを返す
    }
    switch (true) {
      case stats.isFile():
        return callback(null, "file");
      case stats.isDirectory():
        return callback(null, "directory");
      case stats.isSymbolicLink():
        return callback(null, "symlink");
      case stats.isFIFO():
        return callback(null, "fifo");
      case stats.isSocket():
        return callback(null, "socket");
      case stats.isBlockDevice():
        return callback(null, "block-device");
      case stats.isCharacterDevice():
        return callback(null, "character-device");
      default:
        return callback(null, "unknown");
    }
  });
}
