import NoticeCardList from "@admin/components/Scenario/NoticeCardList";
import { GroupContext } from "@admin/utils/groupContext";
import { Scrapers, ScraperContext } from "@admin/utils/scraperContext";
import { StatusContext } from "@admin/utils/statusContext";
import { ScenarioConfig } from "@shared/types";
import {
  noticeScenariosMockData,
  studentRestaurantScenariosMockData,
  domitoryRestaurantScenariosMockData,
  colleageScheduleMockData,
} from "@admin/__mockData__";
import { useContext, useEffect, useState } from "react";
import CardList from "../CardList/CardList";
import getStyle from "./style";

export default function CardListContainer() {
  const [ isNoticeScraper, setIsNoticeScraper ] = useState(false);
  const [ scenario, setScenario ] = useState<ScenarioConfig[]>([]);
  const { group } = useContext(GroupContext);
  const { scraper } = useContext(ScraperContext);
  const { status } = useContext(StatusContext);

  useEffect(() => {
    if (scraper === Scrapers.Notice) {
      setIsNoticeScraper(true);
      setScenario(noticeScenariosMockData);
      return;
    }
    if (scraper === Scrapers.StudentRestaurant) {
      setIsNoticeScraper(false);
      setScenario(studentRestaurantScenariosMockData);
      return;
    }
    if (scraper === Scrapers.DomitoryRestaurant) {
      setIsNoticeScraper(false);
      setScenario(domitoryRestaurantScenariosMockData);
      return;
    }
    if (scraper === Scrapers.CollegeSchedule) {
      setIsNoticeScraper(false);
      setScenario(colleageScheduleMockData);
    }
  }, [ scenario, isNoticeScraper ]);

  const style = getStyle();

  if (isNoticeScraper)
    return <NoticeCardList {...{ style, group, scenario, status }} />;
  return <CardList {...{ style, group, scenario, status }} />;
}
