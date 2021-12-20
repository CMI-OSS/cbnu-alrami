import { ScenarioFilter, ScenarioGroupList } from "src/components/Scenario";
import mockNoticeScenarios from "src/__mockData__/noticeScenarios";
import mockDomitoryRestaurantScenarios from "src/__mockData__/domitoryRestaurantScenarios";
import mockStudentScenarios from "src/__mockData__/studentRestaurantScenarios";
import mockCollegeScheduleScenarios from "src/__mockData__/collegeScheduleScenarios";

import getStyle from "./style";

export enum ScraperType {
  Notice = "notice",
  StudentCafeteria = "학생 식당",
  DomitoryCafeteria = "기숙사 식당",
  CollegeSchedule = "학사 일정",
}

interface Props {
  type: ScraperType;
}

export default function Scraper({ type }: Props) {
  const style = getStyle();

  const getMockScenarios = () => {
    if (type === ScraperType.Notice) return mockNoticeScenarios;
    if (type === ScraperType.DomitoryCafeteria)
      return mockDomitoryRestaurantScenarios;
    if (type === ScraperType.StudentCafeteria) return mockStudentScenarios;

    return mockCollegeScheduleScenarios;
  };

  return (
    <main className={style.main}>
      <h1 className={style.mainTitle}>{type} 스크래퍼 관리보드</h1>
      <ScenarioFilter isNotice={type === ScraperType.Notice} />
      <ScenarioGroupList scenarios={getMockScenarios()} />
    </main>
  );
}
