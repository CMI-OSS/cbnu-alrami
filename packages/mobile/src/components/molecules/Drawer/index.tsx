import { Alarm, Subscription } from "@components/atoms/icon";
import Icon from "@components/atoms/icon/Icon";

import $ from "./style.module.scss";

function Drawer() {
  return (
    <div className={$.drawer}>
      <div className={$.item}>
        <Subscription size={20} />
        구독
      </div>
      <div className={$.item}>
        <Alarm size={20} />
        알람
      </div>
      <div className={$.item}>
        <Icon name="view" size={20} color="#828282" />
        공지사항 보기
      </div>
    </div>
  );
}

export default Drawer;
