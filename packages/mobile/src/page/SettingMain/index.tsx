import { settingConfig } from "src/__mocks__";
import SettingMenu from "src/components/molecules/SettingMenu";
import SettingTemplate from "src/components/templates/SettingTemplate";
import { settingMenuList } from "src/constants";

import $ from "./style.module.scss";

export default function SettingMain() {
  return (
    <SettingTemplate title="설정" className={$["setting-main"]}>
      {settingMenuList.map((route) => {
        const { label } = route;

        return (
          <SettingMenu
            key={label}
            route={route}
            config={settingConfig[label] ? settingConfig[label] : ""}
          />
        );
      })}
    </SettingTemplate>
  );
}
