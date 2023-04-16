import React, { ReactElement } from "react";

export type ErrorBoundaryProps = {
  resetQuery?: () => void;
  errorFallback: (reset: () => void, error: Error | null) => JSX.Element;
  children: ReactElement;
  keys?: Array<unknown>;
};

type State = {
  hasError: boolean;
  error: Error | null;
};
const initialState = { hasError: false, error: null };

const changedArray = (
  prevArray: Array<unknown> = [],
  nextArray: Array<unknown> = [],
) => {
  return (
    prevArray.length !== nextArray.length ||
    prevArray.some((item, index) => {
      return !Object.is(item, nextArray[index]);
    })
  );
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  State
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: State) {
    const { error } = this.state;
    const { keys } = this.props;

    if (
      error !== null &&
      prevState.error !== null &&
      changedArray(prevProps.keys, keys)
    ) {
      this.resetBoundary();
    }
  }

  resetBoundary = () => {
    const { resetQuery } = this.props;
    resetQuery?.();
    this.setState(initialState);
  };

  render() {
    const { hasError, error } = this.state;
    const { errorFallback } = this.props;
    const { children } = this.props;

    if (hasError) {
      return errorFallback(this.resetBoundary, error);
    }

    return children;
  }
}
