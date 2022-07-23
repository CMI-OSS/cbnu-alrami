import { Close, LeftArrow } from "@components/atoms/icon";

import Start from "./Start";
import $ from "./style.module.scss";

function Subscription() {
  return (
    <div className={$.subscription}>
      <div className={$.header}>
        <LeftArrow />
        <Close />
      </div>
      <Start />
    </div>
  );
}

export default Subscription;
