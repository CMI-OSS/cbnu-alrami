import { useState } from "react";
import { ScenarioCardList } from "@admin/components/Scenario";
import Navigation from "@admin/components/Navigation";
import {
  menuContext,
  menuContextConfig,
  sidebarMenus,
} from "@admin/utils/menuContext";
import getStyle from "./style";

export default function Home() {
  const [status, setStatus] = useState(sidebarMenus[0]);
  const { main, mainTitle } = getStyle();

  const contextObj: menuContextConfig = {
    status,
    setContext: (newStatus) => setStatus(newStatus),
  };

  return (
    <menuContext.Provider value={contextObj}>
      <Navigation />
      <main className={main}>
        <h1 className={mainTitle}>CMI 스크래퍼 관리보드</h1>
        <ScenarioCardList />
      </main>
    </menuContext.Provider>
  );
}
