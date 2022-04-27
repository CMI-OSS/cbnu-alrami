import { ScraperType } from "@shared/types";
import mockCollegeScheduleScenarios from "src/__mockData__/collegeScheduleScenarios";
import mockDomitoryRestaurantScenarios from "src/__mockData__/domitoryRestaurantScenarios";
import mockNoticeScenarios from "src/__mockData__/noticeScenarios";
import mockStudentScenarios from "src/__mockData__/studentRestaurantScenarios";
import { ScenarioFilter, ScenarioGroupList } from "src/components/Scenario";
import { getScraperLabel } from "src/lib/scraper";

import { ScraperManager } from "../Manager";
import $ from "./style.module.scss";

interface Props {
  scraperType: ScraperType;
}

export default function Scraper({ scraperType }: Props) {
  const getMockScenarios = () => {
    if (scraperType === "notice") return mockNoticeScenarios;
    if (scraperType === "domitory") return mockDomitoryRestaurantScenarios;
    if (scraperType === "cafeteria") return mockStudentScenarios;

    return mockCollegeScheduleScenarios;
  };

  return (
    <main className={$.main}>
      <h1 className={$.title}>
        {getScraperLabel(scraperType)} 스크래퍼 관리보드
      </h1>
      <ScraperManager scraperType={scraperType} />
      <h2 className={$["sub-title"]}>시나리오 그룹 리스트</h2>
      <ScenarioFilter isNotice={scraperType === "notice"} />
      <ScenarioGroupList scenarios={getMockScenarios()} />
    </main>
  );
}
