import { useEffect, useState } from "react";

import { debounce } from "../lib/debounce";

export default function useWindowResize() {
  const [ size, setSize ] = useState([ 0, 0 ]);
  const detectSize = () => {
    return setSize([ window.innerWidth, window.innerHeight ]);
  };
  useEffect(() => {
    window.addEventListener(
      "resize",
      debounce(() => {
        return detectSize();
      }, 100),
    );

    return () => {
      return window.removeEventListener(
        "resize",
        debounce(() => {
          return detectSize();
        }, 100),
      );
    };
  }, []);
  return size;
}
