import { settingConfig } from "src/__mocks__";
import SettingContact from "src/page/Setting/Contact";
import SettingMenu from "src/page/Setting/Menu";
import SettingTemplate from "src/page/Setting/SettingTemplate";
import { useAppSelector } from "src/store";

import { settingMenuList } from "./constants";
import $ from "./style.module.scss";

export default function SettingMain() {
  const { isDisplayContact } = useAppSelector((state) => {
    return state.settingReducer.setting;
  });

  return (
    <SettingTemplate title="설정" className={$["setting-main"]}>
      {settingMenuList.map((route) => {
        return (
          <SettingMenu
            key={route.label}
            route={route}
            config={settingConfig[route.label]}
          />
        );
      })}
      {isDisplayContact && <SettingContact />}
    </SettingTemplate>
  );
}
