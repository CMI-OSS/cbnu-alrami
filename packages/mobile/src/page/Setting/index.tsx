import { useNavigate } from "react-router-dom";

import { settingConfig } from "src/__mocks__";
import { MapArrow } from "src/components/atoms/icon";
import SettingMenu from "src/components/molecules/SettingMenu";
import { settingMenuList } from "src/constants";

import $ from "./style.module.scss";

export default function Setting() {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  return (
    <>
      <div className={$.header}>
        <button type="button" className={$["back-btn"]} onClick={handleGoBack}>
          <MapArrow />
          <span className="blind">뒤로가기</span>
        </button>
        <h1 className={$.title}>설정</h1>
      </div>
      <main className={$["setting-main"]}>
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
      </main>
    </>
  );
}
