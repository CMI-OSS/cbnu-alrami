import SettingContact from "src/page/Setting/Contact";
import SettingMenu from "src/page/Setting/Menu";
import SettingTemplate from "src/page/Setting/SettingTemplate";
import { useAppSelector } from "src/store";
import { get대표식당 } from "src/utils/storage";

import { settingConfig, settingMenuList } from "./constants";
import $ from "./style.module.scss";

function Main() {
  const representativeCafeteria = get대표식당();
  const { isDisplayContact } = useAppSelector((state) => {
    return state.settingReducer.setting;
  });
  const settingData = settingConfig(representativeCafeteria);

  return (
    <SettingTemplate title="설정" className={$["setting-main"]}>
      {settingMenuList.map((route) => {
        const config = settingData[route.label];
        return <SettingMenu key={route.label} {...{ route, config }} />;
      })}
      {isDisplayContact && <SettingContact />}
    </SettingTemplate>
  );
}

export default Main;
