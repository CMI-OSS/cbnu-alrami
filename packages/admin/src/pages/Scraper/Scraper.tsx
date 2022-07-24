import { ScraperType } from "@shared/types";
import mockCollegeScheduleScenarios from "src/__mockData__/collegeScheduleScenarios";
import mockDomitoryRestaurantScenarios from "src/__mockData__/domitoryRestaurantScenarios";
import mockNoticeScenarios from "src/__mockData__/noticeScenarios";
import mockStudentScenarios from "src/__mockData__/studentRestaurantScenarios";
import { getScraperLabel } from "src/lib/scraper";

import RemoteController from "./RemoteController/RemoteController";
import $ from "./Scraper.module.scss";

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
      <h3 className={$.title}>{getScraperLabel(scraperType)} 스크래퍼</h3>
      <RemoteController scraperType={scraperType} />
      {/* <h2 className={$["sub-title"]}>시나리오 그룹 리스트</h2> */}
      {/* <ScenarioFilter isNotice={scraperType === "notice"} /> */}
      {/* <ScenarioGroupList scenarios={getMockScenarios()} /> */}
    </main>
  );
}
