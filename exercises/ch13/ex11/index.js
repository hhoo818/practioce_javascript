export function originRetryWithExponentialBackoff(func, maxRetry, callback) {
  let attempt = 0;
  function retry() {
    attempt++;
    const result = func();
    if (result) {
      callback(true);
    } else if (attempt < maxRetry) {
      setTimeout(retry, Math.pow(2, attempt - 1) * 1000);
    } else {
      callback(false);
    }
  }
  retry();
}

export function retryWithExponentialBackoff(func, maxRetry, callback) {
  let attempt = 0;
  async function retry() {
    attempt++;
    try {
      const result = await func();
      return result;
    } catch (error) {
      if (attempt < maxRetry) {
        setTimeout(await retry, Math.pow(2, attempt - 1) * 1000);
      } else {
        throw new error(error);
      }
    }
  }
  retry();
}
