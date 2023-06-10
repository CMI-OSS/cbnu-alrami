import { useState } from "react";

import { Alarm, Subscription } from "@components/atoms/icon";
import Icon from "@components/atoms/icon/Icon";
import Toggle from "@components/atoms/Toggle";

import $ from "./style.module.scss";

function Drawer() {
  const [ checked, setChecked ] = useState(false);

  return (
    <div className={$.drawer}>
      <div className={$.item}>
        <Subscription size={20} />
        구독
        <Toggle
          checked={checked}
          onClick={() => {
            return setChecked(!checked);
          }}
        />
      </div>
      <div className={$.item}>
        <Alarm size={20} />
        알람
        <Toggle
          checked
          onClick={() => {
            return console.log("알림");
          }}
        />
      </div>
      <div className={$.item}>
        <Icon name="view" size={20} color="#828282" />
        공지사항 보기
      </div>
    </div>
  );
}

export default Drawer;
