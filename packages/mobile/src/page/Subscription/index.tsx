import { Close, LeftArrow } from "@components/atoms/icon";
import Process from "src/page/Subscription/Process";

import $ from "./style.module.scss";

function Subscription() {
  return (
    <div className={$.subscription}>
      <div className={$.header}>
        <LeftArrow />
        <Close />
      </div>
      {/* <CommonStart /> */}
      <Process />
      {/* <CommonEnd /> */}
    </div>
  );
}

export default Subscription;
