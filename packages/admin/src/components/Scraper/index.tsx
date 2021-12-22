import { ScenarioFilter, ScenarioGroupList } from "src/components/Scenario";
import mockNoticeScenarios from "src/__mockData__/noticeScenarios";
import mockDomitoryRestaurantScenarios from "src/__mockData__/domitoryRestaurantScenarios";
import mockStudentScenarios from "src/__mockData__/studentRestaurantScenarios";
import mockCollegeScheduleScenarios from "src/__mockData__/collegeScheduleScenarios";

import { ScraperType } from "@shared/types";
import { getScraperLabel } from "src/lib/scraper";
import getStyle from "./style";

interface Props {
  type: ScraperType;
}

export default function Scraper({ type }: Props) {
  const style = getStyle();

  const getMockScenarios = () => {
    if (type === "notice") return mockNoticeScenarios;
    if (type === "domitoryCafeteria") return mockDomitoryRestaurantScenarios;
    if (type === "studentCafeteria") return mockStudentScenarios;

    return mockCollegeScheduleScenarios;
  };

  return (
    <main className={style.main}>
      <h1 className={style.mainTitle}>
        {getScraperLabel(type)} 스크래퍼 관리보드
      </h1>
      <ScenarioFilter isNotice={type === "notice"} />
      <ScenarioGroupList scenarios={getMockScenarios()} />
    </main>
  );
}
