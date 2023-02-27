import DeferredComponent from "../DeferredComponent";
import Loading from "../Loading";
import $ from "./style.module.scss";

type Props = {
  height: string;
};

function SuspenseFallback(props: Props) {
  const { height } = props;
  return (
    <DeferredComponent>
      <div className={$["suspense-fallback"]} style={{ height }}>
        <Loading width={64} borderWidth={4} color="#D66D6E" />
      </div>
    </DeferredComponent>
  );
}

export default SuspenseFallback;
