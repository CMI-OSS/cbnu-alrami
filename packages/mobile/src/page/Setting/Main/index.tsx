import SettingContact from "src/page/Setting/Contact";
import SettingMenu from "src/page/Setting/Menu";
import SettingTemplate from "src/page/Setting/SettingTemplate";
import { useAppSelector } from "src/store";

import { settingConfig, settingMenuList } from "./constants";
import $ from "./style.module.scss";

function Main() {
  const representativeCafeteria =
    localStorage.getItem("representativeCafeteria") || "설정 안함";
  const { isDisplayContact } = useAppSelector((state) => {
    return state.settingReducer.setting;
  });
  const settingData = settingConfig(representativeCafeteria);

  return (
    <SettingTemplate title="설정" className={$["setting-main"]}>
      {settingMenuList.map((route) => {
        const candidate = settingData[route.label];
        const config = candidate === "표시 안함" ? "설정 안함" : candidate;

        return <SettingMenu key={route.label} {...{ route, config }} />;
      })}
      {isDisplayContact && <SettingContact />}
    </SettingTemplate>
  );
}

export default Main;
