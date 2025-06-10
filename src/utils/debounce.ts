export const debounce = (fn: (...args: unknown[]) => void, time: number) => {
  let timer: any = null;

  return (...args: unknown[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, time);
  };
};
