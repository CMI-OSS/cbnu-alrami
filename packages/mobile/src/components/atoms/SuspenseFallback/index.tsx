import classnames from "classnames";

import DeferredComponent from "../DeferredComponent";
import Loading from "../Loading";
import $ from "./style.module.scss";

type Props = {
  height: string;
  isRoundBox?: boolean;
};

function SuspenseFallback(props: Props) {
  const { height, isRoundBox } = props;
  return (
    <div
      className={classnames($["suspense-fallback"], {
        [$["round-box"]]: isRoundBox,
      })}
      style={{ height }}
    >
      <DeferredComponent>
        <Loading width={64} borderWidth={4} color="#D66D6E" />
      </DeferredComponent>
    </div>
  );
}

export default SuspenseFallback;
