import { useEffect, useState } from "react";

import { throttle } from "src/utils/throttle";

export default function useWindowResize() {
  const [ size, setSize ] = useState([ 0, 0 ]);
  const detectSize = () => {
    return setSize([ window.innerWidth, window.innerHeight ]);
  };
  useEffect(() => {
    window.addEventListener(
      "resize",
      throttle(() => {
        return detectSize();
      }, 300),
    );

    return () => {
      return window.removeEventListener(
        "resize",
        throttle(() => {
          return detectSize();
        }, 300),
      );
    };
  }, []);
  return size;
}
