import { useState } from "react";
import { ScenarioCardList } from "@admin/components/Scenario";
import Navigation from "@admin/components/Navigation";
import {
  MenuContext,
  MenuContextConfig,
  MenuConfig,
} from "@admin/utils/menuContext";
import getStyle from "./style";

export default function Home() {
  const [status, setStatus] = useState(MenuConfig.all);
  const style = getStyle();

  const contextObj: MenuContextConfig = {
    status,
    setContext: (newStatus) => setStatus(newStatus),
  };

  return (
    <MenuContext.Provider value={contextObj}>
      <Navigation />
      <main className={style.main}>
        <h1 className={style.mainTitle}>CMI 스크래퍼 관리보드</h1>
        <ScenarioCardList />
      </main>
    </MenuContext.Provider>
  );
}
