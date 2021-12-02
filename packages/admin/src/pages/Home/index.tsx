import { useState } from "react";
import { CardListContainer } from "@admin/components/Scenario";
import Navigation from "@admin/components/Navigation";
import { ScrapperContext, ScrapperConfig } from "@admin/utils/scrapperContext";
import { GroupContext } from "@admin/utils/groupContext";
import Selector from "@admin/components/Selector";
import { StatusConfig, StatusContext } from "@admin/utils/statusContext";
import getStyle from "./style";

export default function Home() {
  const [ scrapper, setScrapper ] = useState(ScrapperConfig.notice);
  const [ group, setGroup ] = useState("모두보기");
  const [ status, setStatus ] = useState(StatusConfig.all);
  const style = getStyle();

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      <GroupContext.Provider value={{ group, setGroup }}>
        <ScrapperContext.Provider value={{ scrapper, setScrapper }}>
          <Navigation />
          <main className={style.main}>
            <h1 className={style.mainTitle}>{scrapper} 스크래퍼 관리보드</h1>
            <Selector />
            <CardListContainer />
          </main>
        </ScrapperContext.Provider>
      </GroupContext.Provider>
    </StatusContext.Provider>
  );
}
