import React, { ReactElement } from "react";

interface Props {
  resetQuery?: () => void;
  errorFallback: (...args: any[]) => ReactElement;
  children: ReactElement;
  keys: any;
}

interface State {
  hasError: boolean;
  error?: Error | null;
}
const initialState = { hasError: false, error: null };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    console.log("error", error);
    return { hasError: true, error };
  }

  componentDidUpdate(prev: Props) {
    const { keys } = this.props;
    if (prev.keys !== keys) {
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
    const { errorFallback: ErrorFallback, children } = this.props;
    if (hasError) {
      return <ErrorFallback error={error} reset={this.resetBoundary} />;
    }

    return children;
  }
}
