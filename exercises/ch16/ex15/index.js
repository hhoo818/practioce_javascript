import { isMainThread, Worker, parentPort } from "worker_threads";

if (isMainThread) {
  let num = 0;
  const worker = new Worker(__filename);

  worker.on("online", () => {
    console.log("Worker is online");
  });

  worker.on("message", (message) => {
    if (message === "num をインクリメントせよ") {
      num++;
    } else if (message === "done") {
      console.log(num);
    }
  });

  for (let i = 0; i < 10_000_000; i++) {
    num++;
  }

  worker.postMessage("start");
} else {
  parentPort.on("message", (message) => {
    if (message === "start") {
      for (let i = 0; i < 10_000_000; i++) {
        parentPort.postMessage("num をインクリメントせよ");
      }
      parentPort.postMessage("done");
    }
  });
}
