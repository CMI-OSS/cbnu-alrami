export const debounce = (callback: () => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(), delay);
  };
};
