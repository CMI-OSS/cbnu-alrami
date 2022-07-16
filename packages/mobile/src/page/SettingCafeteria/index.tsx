import { Food } from "src/components/atoms/icon";
import SettingTemplate from "src/components/templates/SettingTemplate";

import $ from "./style.module.scss";

export default function SettingCafeteria() {
  return (
    <SettingTemplate title="대표 식당">
      <div className={$["setting-cafeteria"]}>
        <Food width="32px" height="37.33px" />
        <span className={$.text}>
          홈화면에 표시할
          <br />
          식당을 선택해주세요
        </span>
      </div>
    </SettingTemplate>
  );
}
