import { PropsWithChildren, useEffect, useState } from "react";

import { DEFFERRED_LOADING_TIME } from "src/consts";

function DeferredComponent({ children }: PropsWithChildren) {
  const [ isDeferred, setIsDeferred ] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, DEFFERRED_LOADING_TIME);
    return () => {
      return clearTimeout(timeoutId);
    };
  }, []);

  if (!isDeferred) {
    return null;
  }
  return <>{children}</>;
}

export default DeferredComponent;
