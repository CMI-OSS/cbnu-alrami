import { CMITeamLogo } from "@components/atoms/icon";

import SettingTemplate from "../SettingTemplate";
import $ from "./style.module.scss";

function Creator() {
  return (
    <SettingTemplate title="만든이" className={$.creator}>
      <div className={$["team-intro"]}>
        <CMITeamLogo size={70} />
        <span className={$["cmi-text"]}>CMI</span>
      </div>
    </SettingTemplate>
  );
}

export default Creator;
