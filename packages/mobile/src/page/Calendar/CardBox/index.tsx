import { animateScroll } from "react-scroll";

import { Arrow } from "@components/atoms/icon";
import guideEmptyFavoritesSchedule from "src/assets/guide_empty_favorites_schedule.png";
import useScroll from "src/hooks/useScroll";
import { ScheduleType } from "src/page/Calendar";
import { Schedule } from "src/type";

import CollegeCard from "../CollegeCard";
import $ from "./style.module.scss";

const CALLENDAR_UNVISIBLE_POINT = 320;

type Props = {
  bookmarkedSchedules: Schedule[];
  scheduleType: ScheduleType;
  todaysSchedules: Schedule[];
};

function CardBox({
  scheduleType,
  todaysSchedules,
  bookmarkedSchedules,
}: Props) {
  const { y } = useScroll();
  const bookmarkedIDList = bookmarkedSchedules.map(({ id }) => {
    return id;
  });

  if (todaysSchedules.length === 0)
    return (
      <section className={$["empty-box"]}>
        {scheduleType === "all" ? (
          <span className={$.discription}>오늘은 일정이 없어요</span>
        ) : (
          <img
            width={239}
            src={guideEmptyFavoritesSchedule}
            alt="즐겨찾기된 학사일정 없음"
          />
        )}
      </section>
    );

  return (
    <section className={$["card-box"]}>
      {todaysSchedules.map(({ id, content, startDate, endDate }) => {
        return (
          <CollegeCard
            key={id}
            isBookmarked={bookmarkedIDList.includes(id)}
            {...{ id, content, startDate, endDate }}
          />
        );
      })}
      {y > CALLENDAR_UNVISIBLE_POINT && (
        <button
          className={$["floating-button"]}
          type="button"
          onClick={() => {
            return animateScroll.scrollToTop({ duration: 250 });
          }}
        >
          <Arrow size={10} stroke="#828282" />
        </button>
      )}
    </section>
  );
}

export default CardBox;
