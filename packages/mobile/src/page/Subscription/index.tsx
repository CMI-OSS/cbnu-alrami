import { Close, LeftArrow } from "@components/atoms/icon";
import CommonEnd from "src/page/Subscription/CommonEnd";

import $ from "./style.module.scss";

function Subscription() {
  return (
    <div className={$.subscription}>
      <div className={$.header}>
        <LeftArrow />
        <Close />
      </div>
      {/* <CommonStart /> */}
      <CommonEnd />
    </div>
  );
}

export default Subscription;
