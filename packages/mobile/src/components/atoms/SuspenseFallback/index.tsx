import classnames from "classnames";
import { StyleProps } from "src/type/props";

import DeferredComponent from "../DeferredComponent";
import Loading from "../Loading";
import $ from "./style.module.scss";

type Props = {
  height?: string;
  isRoundBox?: boolean;
} & StyleProps;

function SuspenseFallback(props: Props) {
  const { height, isRoundBox, style, className } = props;

  if (!height && !style && !className) {
    throw new Error(
      "Either 'height' or 'style' or 'className' prop must be provided in SuspenseFallback component ",
    );
  }

  return (
    <div
      className={classnames($["suspense-fallback"], className, {
        [$["round-box"]]: isRoundBox,
      })}
      style={{ height, ...style }}
    >
      <DeferredComponent>
        <Loading width={64} borderWidth={4} color="#D66D6E" />
      </DeferredComponent>
    </div>
  );
}

export default SuspenseFallback;
