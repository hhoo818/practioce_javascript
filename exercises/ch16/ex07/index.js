import fs from "fs";

export async function checkEntry(path) {
  fs.stat(path, (err, stats) => {
    if (err) {
      throw err;
    }
    switch (true) {
      case stats.isFile():
        return "file";
      case stats.isDirectory():
        return "directory";
      // シンボリックリンク(ex ln -s /home/user/myfile /home/user/mylink)
      case stats.isSymbolicLink():
        return "symlink";
      // FIFO (名前付きパイプ)プロセス間通信（IPC）を行うための特別なファイル
      case stats.isFIFO():
        return "fifo";
      // ソケット ネットワーク通信を行うためのエンドポイント
      case stats.isSocket():
        return "socket";
      // ブロックデバイス (HDD,SSDなど ex /dev/sdb)
      case stats.isBlockDevice():
        return "block-device";
      // キャラクターデバイス(キーボード、マウスなど)
      case stats.isCharacterDevice():
        return "character-device";
      default:
        return "unknown";
    }
  });
}
