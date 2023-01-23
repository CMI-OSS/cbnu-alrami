import React from "react";
import { useLocation } from "react-router-dom";

// https://v5.reactrouter.com/web/example/query-parameters
export default function useQeuryParam() {
  const { search } = useLocation();

  return React.useMemo(() => {
    return new URLSearchParams(search);
  }, [ search ]);
}
