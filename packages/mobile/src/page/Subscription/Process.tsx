import { GUIDE } from "src/page/Subscription/constant";
import $ from "src/page/Subscription/style.module.scss";

function Process() {
  return (
    <div className={$.process}>
      <div className={$.guide}>
        <div className={$.title}>전체</div>
        <div className={$.content}>{GUIDE.all_depth1}</div>
      </div>
    </div>
  );
}

export default Process;
