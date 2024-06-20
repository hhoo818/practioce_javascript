function fibo2() {
  let x = 0;
  let y = 1;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const value = y;
      [x, y] = [y, x + y];
      return { value, done: false };
    },
  };
}

export function fibonacci2(n) {
  for (let f of fibo2()) if (n-- <= 0) return f;
}
