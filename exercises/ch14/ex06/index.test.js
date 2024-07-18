import { createTrackedObject } from "./index.js";

test("test", () => {
  const myObject = {
    echo(name) {
      console.log(name);
    },
    add(a, b) {
      return a + b;
    },
  };
  const { proxy, callHistory } = createTrackedObject(myObject);
  proxy.echo("hello World");
  proxy.add(2, 3);

  expect(callHistory[0].timestamp).toBeInstanceOf(Date);
  expect(callHistory[0].method).toBe("echo");
  expect(callHistory[0].parameters).toEqual(["hello World"]);

  expect(callHistory[1].timestamp).toBeInstanceOf(Date);
  expect(callHistory[1].method).toBe("add");
  expect(callHistory[1].parameters).toEqual([2, 3]);
});
