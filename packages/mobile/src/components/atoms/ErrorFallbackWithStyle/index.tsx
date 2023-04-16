import { ErrorBoundaryProps } from "src/components/templates/ErrorBoundary";

import ErrorFallback, { ErrorFallbackProps } from "../ErrorFallback";

type Props = Omit<ErrorFallbackProps, "reset" | "error">;

function ErrorFallbackWithStyle({
  height,
  className,
  style,
}: Props): ErrorBoundaryProps["errorFallback"] {
  return (reset, error) => {
    return <ErrorFallback {...{ error, reset, height, className, style }} />;
  };
}

export default ErrorFallbackWithStyle;
