import { useMemo } from "react";
import { debounce } from "../lib/debounce";

export default function useDebounceInput<T>(setInput: (v: T) => void) {
  return useMemo(() => debounce<T>((v: T) => setInput(v), 300), []);
}
