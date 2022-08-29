import SettingContact from "src/page/Setting/Contact";
import SettingMenu from "src/page/Setting/Menu";
import SettingTemplate from "src/page/Setting/SettingTemplate";
import { useAppSelector } from "src/store";
import { getSelectedCafeteria } from "src/utils/storage";

import { settingConfig, settingMenuList } from "./constants";
import $ from "./style.module.scss";

function Main() {
  const selectedCafeteria = getSelectedCafeteria();
  const { isDisplayContact } = useAppSelector((state) => {
    return state.settingReducer.setting;
  });
  const settingData = settingConfig(selectedCafeteria);

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
