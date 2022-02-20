import { useState, useEffect } from "react";
import { debounce } from "../lib/debounce";

export default function useWindowResize() {
  const [ size, setSize ] = useState([ 0, 0 ]);
  const detectSize = () => setSize([ window.innerWidth, window.innerHeight ]);
  useEffect(() => {
    window.addEventListener(
      "resize",
      debounce(() => detectSize(), 50),
    );

    return () =>
      window.removeEventListener(
        "resize",
        debounce(() => detectSize(), 50),
      );
  }, []);
  return size;
}
