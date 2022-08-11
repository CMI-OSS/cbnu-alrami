import { animateScroll } from "react-scroll";

import { Arrow } from "@components/atoms/icon";
import guideEmptyFavoritesSchedule from "src/assets/guide_empty_favorites_schedule.png";
import useScroll from "src/hooks/useScroll";
import { Schedule, ScheduleType } from "src/page/Calendar";

import CollegeCard from "../CollegeCard";
import $ from "./style.module.scss";

const CALLENDAR_UNVISIBLE_POINT = 320;

type Props = {
  scheduleType: ScheduleType;
  schedules: Schedule[];
};

function CardBox({ scheduleType, schedules }: Props) {
  const { Y } = useScroll();

  if (schedules.length === 0)
    return (
      <section className={$["empty-box"]}>
        {scheduleType === "all" ? (
          <span className={$.discription}>오늘은 일정이 없어요</span>
        ) : (
          <img
            className={$["empty-bookmark-board"]}
            src={guideEmptyFavoritesSchedule}
            alt="즐겨찾기된 학사일정 없음"
          />
        )}
      </section>
    );

  return (
    <section className={$["card-box"]}>
      {schedules.map(({ id, content, startDate, endDate }) => {
        return <CollegeCard key={id} {...{ content, startDate, endDate }} />;
      })}
      {Y > CALLENDAR_UNVISIBLE_POINT && (
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
