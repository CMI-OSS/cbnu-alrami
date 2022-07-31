import { settingConfig } from "src/__mocks__";
import SettingMenu from "src/page/Setting/SettingMenu";
import SettingTemplate from "src/page/Setting/SettingTemplate";

import { settingMenuList } from "./constants";
import $ from "./style.module.scss";

export default function SettingMain() {
  return (
    <SettingTemplate title="설정" className={$["setting-main"]}>
      {settingMenuList.map((route) => {
        const { label } = route;
        const config = settingConfig[label];

        return <SettingMenu key={label} route={route} config={config || ""} />;
      })}
    </SettingTemplate>
  );
}
