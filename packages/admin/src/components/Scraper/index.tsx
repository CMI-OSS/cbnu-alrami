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

  return (
    <main className={style.main}>
      <h1 className={style.mainTitle}>{type} 스크래퍼 관리보드</h1>
      {/* <Selector /> */}
      {/* <Scraper /> */}
    </main>
  );
}
