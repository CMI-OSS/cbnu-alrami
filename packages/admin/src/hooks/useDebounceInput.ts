import { useMemo } from "react";

import { debounce } from "../lib/debounce";

export default function useDebounceInput<T>(setInput: (inputValue: T) => void) {
  return useMemo(() => {
    return debounce<T>((inputValue: T) => {
      return setInput(inputValue);
    }, 300);
  }, []);
}
