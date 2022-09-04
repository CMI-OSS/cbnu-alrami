import { PropsWithChildren, ReactElement, Suspense, useCallback } from "react";
import { useQueryErrorResetBoundary } from "react-query";

import ErrorBoundary from "../ErrorBoundary";

interface Props {
  suspenseFallback: ReactElement;
  errorFallback: (...args: any[]) => ReactElement;
  fallBackHeight: string;
  keys?: Array<unknown>;
}

const AsyncBoundary = (props: PropsWithChildren<Props>) => {
  const { suspenseFallback, errorFallback, children, keys, fallBackHeight } =
    props;
  const { reset } = useQueryErrorResetBoundary();
  const resetHandler = useCallback(() => {
    reset();
  }, [ reset ]);

  return (
    <ErrorBoundary
      resetQuery={resetHandler}
      {...{ errorFallback, fallBackHeight, keys }}
    >
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
