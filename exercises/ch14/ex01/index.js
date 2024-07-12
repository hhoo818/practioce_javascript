export function unwritableAndUnconfigurableObj() {
  const obj = {};
  Object.defineProperty(obj, "a", {
    value: 1,
    writable: false,
    configurable: false,
    enumerable: true,
  });
  return obj;
}

export function writableAndUnconfigurableObj() {
  const obj = {};
  Object.defineProperty(obj, "b", {
    value: 2,
    writable: true,
    configurable: false,
    enumerable: true,
  });
  return obj;
}

export function nestedUnwritableObj() {
  const e = {};
  Object.defineProperty(e, "e", {
    value: 3,
    writable: false,
    configurable: true,
    enumerable: true,
  });
  Object.seal(e);
  const d = {};
  Object.defineProperty(d, "d", {
    value: e,
    writable: false,
    configurable: true,
    enumerable: true,
  });
  Object.seal(d);
  const c = {};
  Object.defineProperty(c, "c", {
    value: d,
    writable: false,
    configurable: true,
    enumerable: true,
  });
  Object.seal(c);
  return c;
}
