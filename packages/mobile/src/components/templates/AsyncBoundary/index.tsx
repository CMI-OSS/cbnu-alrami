import { PropsWithChildren, ReactElement, Suspense, useCallback } from "react";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import ErrorBoundary, { ErrorBoundaryProps } from "../ErrorBoundary";

type Props = {
  suspenseFallback: ReactElement;
  errorFallback: ErrorBoundaryProps["errorFallback"];
  keys?: ErrorBoundaryProps["keys"];
};

const AsyncBoundary = (props: PropsWithChildren<Props>) => {
  const { suspenseFallback, errorFallback, children, keys } = props;
  const { reset } = useQueryErrorResetBoundary();
  const resetHandler = useCallback(() => {
    reset();
  }, [ reset ]);

  return (
    <ErrorBoundary resetQuery={resetHandler} {...{ errorFallback, keys }}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
