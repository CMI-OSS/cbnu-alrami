import { CMILogo } from "src/components/atoms/icon/CMILogo";

import SettingTemplate from "../SettingTemplate";
import $ from "./style.module.scss";

function Creator() {
  return (
    <SettingTemplate title="만든이" className={$.creator}>
      <div className={$["team-intro"]}>
        <CMILogo size={100} />
        <span className={$["cmi-text"]}>CMI</span>
      </div>
    </SettingTemplate>
  );
}

export default Creator;
