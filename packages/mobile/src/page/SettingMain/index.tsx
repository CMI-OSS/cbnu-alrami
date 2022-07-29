import { settingConfig } from "src/__mocks__";
import SettingMenu from "src/components/molecules/SettingMenu";
import SettingTemplate from "src/components/templates/SettingTemplate";
import { settingMenuList } from "src/constants";
import { useAppDispatch, useAppSelector } from "src/store";

import $ from "./style.module.scss";

export default function SettingMain() {
  const { isDisplayContact } = useAppSelector(
    (state) => state.settingReducer.setting,
  );
  const dispatch = useAppDispatch();

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
