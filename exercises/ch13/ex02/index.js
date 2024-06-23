function wait(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

// 0, 1, 2, 3 秒待つ
const wait0 = () => wait(0);
const wait1 = () => wait(1000);
const wait2 = () => wait(2000);
const wait3 = () => wait(3000);

// ログ出力
const log = (v) => console.log(v);
const logA = (v) => console.log("A");
const logB = (v) => console.log("B");
const logC = (v) => console.log("C");

// 例外
const errX = () => {
  throw new Error("X");
};
const errY = () => {
  throw new Error("Y");
};

function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  // try-catchではキャッチできない。なぜならwait(0)は満たされてはいないが解消しているから
  // 図解:
  //  wait0
  // |-|
  //   logC
  //   |-|
  //    logA
  //      |-|
  //     throw X
  //         |-|
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}

function f4() {
  // NOTE: f5 との比較用
  // logAを出力後、40をreturnしてresolveするのでつぎのwait(1000)が動作する
  //  wait2
  // |---|
  //      logA
  //      |-|
  //    wait10
  //      |----------|
  //               logB
  //                  |-|
  //               log100
  //                    |-|
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}
//f4();
function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  // コールバック関数になっていないのでうまく動作しなくなる
  //コールバックが無視されて
  // B→2秒後にA→即時40と表示される
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then(
      wait1().then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}
//f5();

function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか
  // promiseが満たされたら同時に動作する
  //  wait1
  // |--|
  //     logA
  //    |-|
  //    wait1
  //      |--|
  //       logB
  //         |-|
  //     wait2
  //       |---|
  //       logC
  //           |-|
  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}
//f6();

function f7() {
  // 2s→1s→A→B→Cではないのか 違った
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  // const p のところに移動したところでwait1()が動作する。
  // よって、1秒後にA→1秒後にBCが表示された
  //  const p wait1()→logA
  // |--|-|
  //    wait2()→logB
  //   |---|
  //       logC
  //       |-|
  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}
//f7();

function f8() {
  // NOTE: f9, f10 との比較用
  // 1秒後にエラーXが発生してキャッチに入りAが表示される
  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}
// f8();

function f9() {
  // NOTE: f12 との比較用
  // 1秒後に42が渡され、エラーのYがスローされYが表示され、その後Aが表示される
  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}
//f9();

function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  // 等しくないこの書きかただと非同期のエラーに関しては呼び出し元にスローできない。よってe.messageが飛ばされ
  // logAが表示されて、エラーが発生して、Ｙが表示される。
  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}
function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  //キャッチできる
  //PromiseがrejectになりXが表示された
  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
}
// f11();

function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  // 検知できない:親のPromiseはrejectと拾えない
  //new promise内のsetTimeOutのタスクが実行される→promiseの一番下まで到達pendingの状態→エラーがスローされる
  // 違うかも
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("error")), 2);
  }).catch((e) => log(e.message));
}
f12();
