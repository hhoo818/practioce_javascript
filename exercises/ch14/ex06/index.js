function createTrackedObject(obj) {
  const callHistory = [];

  const proxy = new Proxy(obj, {
    get(target, prop, receiver) {
      const originalMethod = target[prop];

      if (typeof originalMethod === "function") {
        return function (...args) {
          const callInfo = {
            timestamp: new Date(),
            method: prop,
            parameters: args,
          };
          callHistory.push(callInfo);

          return originalMethod.apply(this, args);
        };
      }

      return Reflect.get(target, prop, receiver);
    },
  });

  return { proxy, callHistory };
}

/*
const myObject = {
  greet(name) {
    console.log(`Hello, ${name}!`);
  },
  add(a, b) {
    return a + b;
  },
};

const { proxy, callHistory } = createTrackedObject(myObject);
proxy.greet("Alice"); 
proxy.add(2, 3); 
console.log(callHistory); 
*/
