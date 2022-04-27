export function debounce<T>(callback: (arg: T) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return function (arg: T) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(arg), delay);
  };
}
