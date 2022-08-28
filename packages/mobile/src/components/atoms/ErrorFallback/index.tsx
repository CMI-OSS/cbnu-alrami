import $ from "./style.module.scss";

type Props = {
  error: Error;
  reset: () => void;
  height: string;
};

function ErrorFallback(props: Props) {
  const { error, reset, height } = props;
  return (
    <div className={$["error-fallback"]} style={{ ...{ height } }}>
      <div className={$["error-fallback-box"]}>
        <span className={$["error-msg"]}>{error?.message}</span>
        <button type="button" onClick={reset} className={$["reset-btn"]}>
          try again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
