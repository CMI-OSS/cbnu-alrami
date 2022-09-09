export function throttle<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: T) => {
    if (!timer) {
      timer = setTimeout(() => {
        callback(...args);
        timer = null;
      }, delay);
    }
  };
}
