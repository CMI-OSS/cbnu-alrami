import LoadingSpinner from "../LoadingSpinner";
import $ from "./style.module.scss";

type Props = {
  height: string;
};

function SuspenseFallback(props: Props) {
  const { height } = props;
  return (
    <div className={$["suspense-fallback"]} style={{ ...{ height } }}>
      <LoadingSpinner width={4} borderWidth={0.3} color="#D66D6E" />
    </div>
  );
}

export default SuspenseFallback;
