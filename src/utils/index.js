export const asyncify = (promise) => {
  return promise.then((data) => [null, data]).catch((error) => [error]);
};
