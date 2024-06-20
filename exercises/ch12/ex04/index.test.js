import { primeGenerator } from "./index.js";

test("primeGenerator test", () => {
  const getPrime = primeGenerator();
  expect(getPrime.next().value).toBe(2);
  expect(getPrime.next().value).toBe(3);
  expect(getPrime.next().value).toBe(5);
  expect(getPrime.next().value).toBe(7);
  expect(getPrime.next().value).toBe(11);
  expect(getPrime.next().value).toBe(13);
});
