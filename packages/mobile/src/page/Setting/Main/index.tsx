import { settingConfig } from "src/__mocks__";
import SettingMenu from "src/page/Setting/SettingMenu";
import SettingTemplate from "src/page/Setting/SettingTemplate";
import SettingContact from "src/page/SettingContact";
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
        const { label } = route;
        const config = settingConfig[label];

        return <SettingMenu key={label} route={route} config={config || ""} />;
      })}
      {isDisplayContact && <SettingContact />}
    </SettingTemplate>
  );
}
