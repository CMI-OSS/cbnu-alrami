import classnames from "classnames";
import { StyleProps } from "src/type/props";

import $ from "./style.module.scss";

export type ErrorFallbackProps = {
  error: Error | null;
  reset: () => void;
  height?: string;
} & StyleProps;

function ErrorFallback(props: ErrorFallbackProps) {
  const { error, reset, height, className, style } = props;

  if (!height && !style && !className) {
    throw new Error(
      "Either 'height' or 'style' or 'className' prop must be provided in ErrorFallback component ",
    );
  }
  if (!error) throw new Error("error does not exist");

  const errorMsg = error.message
    ? error.message
    : "알 수 없는 오류가 발생했습니다.";

  return (
    <div
      className={classnames($["error-fallback"], className)}
      style={{ ...style, height }}
    >
      <div className={$["error-fallback-box"]}>
        <span
          className={$["error-msg"]}
          dangerouslySetInnerHTML={{ __html: errorMsg }}
        />
        <button type="button" onClick={reset} className={$["reset-btn"]}>
          다시 시도
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
