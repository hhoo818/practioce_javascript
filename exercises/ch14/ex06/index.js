export function createTrackedObject(obj) {
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
