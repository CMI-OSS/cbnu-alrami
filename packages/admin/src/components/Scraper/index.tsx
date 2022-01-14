import { ScenarioFilter, ScenarioGroupList } from "src/components/Scenario";
import mockNoticeScenarios from "src/__mockData__/noticeScenarios";
import mockDomitoryRestaurantScenarios from "src/__mockData__/domitoryRestaurantScenarios";
import mockStudentScenarios from "src/__mockData__/studentRestaurantScenarios";
import mockCollegeScheduleScenarios from "src/__mockData__/collegeScheduleScenarios";

import { ScraperType } from "@shared/types";
import { getScraperLabel } from "src/lib/scraper";
import { ScraperManager } from "../Manager";
import getStyle from "./style";

interface Props {
  scraperType: ScraperType;
}

export default function Scraper({ scraperType }: Props) {
  const style = getStyle();

  const getMockScenarios = () => {
    if (scraperType === "notice") return mockNoticeScenarios;
    if (scraperType === "domitoryCafeteria")
      return mockDomitoryRestaurantScenarios;
    if (scraperType === "studentCafeteria") return mockStudentScenarios;

    return mockCollegeScheduleScenarios;
  };

  return (
    <main className={style.main}>
      <h1 className={style.mainTitle}>
        {getScraperLabel(scraperType)} 스크래퍼 관리보드
      </h1>
      <ScraperManager />
      <h2 className={style.scenarioTitle}>시나리오 그룹 리스트</h2>
      <ScenarioFilter isNotice={scraperType === "notice"} />
      <ScenarioGroupList scenarios={getMockScenarios()} />
    </main>
  );
}
