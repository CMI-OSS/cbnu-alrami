import NoticeCardList from "@admin/components/Scenario/NoticeCardList";
import { GroupContext } from "@admin/utils/groupContext";
import { ScrapperConfig, ScrapperContext } from "@admin/utils/scrapperContext";
import { StatusContext } from "@admin/utils/statusContext";
import {
  noticeScenariosMocks,
  studentRestaurantScenariosMocks,
  domitoryRestaurantScenariosMocks,
  colleageScheduleMocks,
} from "@admin/__mocks__";
import { useContext } from "react";
import CardList from "../CardList/CardList";
import getStyle from "./style";

export default function CardListContainer() {
  const { group } = useContext(GroupContext);
  const { scrapper } = useContext(ScrapperContext);
  const { status } = useContext(StatusContext);
  const { notice, studentRestaurant, domitoryRestaurant } = ScrapperConfig;
  const style = getStyle();

  let isNoticeScrapper = false;
  let data;

  switch (scrapper) {
    case notice:
      isNoticeScrapper = true;
      data = noticeScenariosMocks;
      break;
    case studentRestaurant:
      data = studentRestaurantScenariosMocks;
      break;
    case domitoryRestaurant:
      data = domitoryRestaurantScenariosMocks;
      break;
    default:
      data = colleageScheduleMocks;
  }

  return isNoticeScrapper ? (
    <NoticeCardList style={style} group={group} data={data} status={status} />
  ) : (
    <CardList style={style} status={status} data={data} />
  );
}
