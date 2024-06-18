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

/*
Promise.anyメソッドは渡されたオブジェクトのうち、Promiseが1つでも履行(Fullfilled)されると、すぐにその結果をPromiseを返す
よって次のようになる
 解答：1s後に42が出力され2s後に100が表示される
 説明
 awaitでPromiseが履行するのを待ち，42がかえってきたら次の行log(v)を実行して42が出力される
 その後2s待機している間にvの非同期処理が進行し．v=100になり，100が出力される
*/
async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}
//i1()

/*
  Promise.allメソッドは渡されたオブジェクトの処理が全て終了した場合、それぞれの結果を配列で返します
  よって
  解答3s後にA，2s後にB,1s後にCが表示されて最後にリストの[A,B,C]が表示される
  説明
  await全てのオブジェクトが履行されるまで待つのでA→B→Cと表示されPromise.Allの特性でオブジェクトが返した値をリストで返すことで[A,B,C]が出力される
  */
async function i2() {
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}
//i2();

/*
1つでも拒否（Rejected)されると、一番最初に拒否（Rejected)されたエラーメッセージが返却される
よって回答：1s後にY→42，1s後にB，1a後に0が表示される
説明エラーは一回したキャッチは最初の１回し返されない．エラーキャッチしたとしても他のオブジェクトpromiseの処理が止まるわけではないため
*/
async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}
//i3()

/*
i=0
-----
    i=1
    |----
       i=2
         |---
          i=3
             |--
               i=4
                |-
                  complete
最初のforで全部のpが動くが上のpのpromiseが履行されるのを待つのでタイマーが想定通り動いている
*/
async function i4() {
  // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
    log(12345);
  }
  return p.then(() => log("COMPLETED"));
}
//i4();

// thenの中が関数で渡されていないので履行を待つことができない
//よって最初にCOMPLETEが表示されて1秒ごとに4,3,2,1と表示される
async function i5() {
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}
//i5();

/*
回答1sごとに4,3,2,1,0と表示され，最後にCOMPLETEDと表示される
説明：Promise.allで渡された[0,1,2,3,4]それぞれ並列で処理される．そのため1秒ごとに表示される．
そして全てが履行されたた次に進みCOMPLETEDと表示される．
*/
async function i6() {
  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i)))
  ).then(() => log("COMPLETED"));
}
//i6()

/*
互いにvを5足すので10が出力される
並列で書き込むことができるとわかる
*/
async function i7() {
  // NOTE: i8 との比較用
  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

//i7()

// 解答5が返ってくる
// 理由よくわからない
async function i8() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
      const next = v + 1;
      await wait2();
      v = next;
      console.log("aiueo");
      console.log(v);
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
      console.log("あいうえお");
      console.log(v);
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

i8();
