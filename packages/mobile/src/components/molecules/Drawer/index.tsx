import { useState } from "react";

import Icon from "@components/atoms/icon/Icon";
import Toggle from "@components/atoms/Toggle";

import $ from "./style.module.scss";

function Drawer() {
  const [ checked, setChecked ] = useState(false);

  return (
    <div className={$.drawer}>
      <div className={$.item}>
        <div className={$.title}>
          <Icon name="subscribe" size={20} />
          구독
        </div>
        <Toggle
          checked={checked}
          onClick={() => {
            return setChecked(!checked);
          }}
        />
      </div>
      <div className={$.item}>
        <div className={$.title}>
          <Icon name="alarm" size={20} />
          알람
        </div>
        <Toggle
          checked
          onClick={() => {
            return console.log("알림");
          }}
        />
      </div>
      <div className={$.item}>
        <div className={$.title}>
          <Icon name="view" size={20} />
          공지사항 보기
        </div>
      </div>
    </div>
  );
}

export default Drawer;
