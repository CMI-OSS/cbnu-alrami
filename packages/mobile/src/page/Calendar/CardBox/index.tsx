import { animateScroll } from "react-scroll";

import { ScheduleBoard, Star } from "src/components/atoms/icon";
import { Arrow } from "src/components/atoms/icon/Arrow";
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
          <span className={$["all-schedule-discription"]}>
            오늘은 일정이 없어요
          </span>
        ) : (
          <>
            <ScheduleBoard
              className={$["board-icon"]}
              width="239px"
              height="54px"
            />
            <div className={$["description-box"]}>
              <span className={$["stared-schedule-description"]}>
                학사일정 우측 하단의{" "}
              </span>
              <Star width="13px" height="13" />
              <span className={$["stared-schedule-description"]}>을 눌러</span>
            </div>
            <span className={$["stared-schedule-description"]}>
              관심있는 공지를 저장해요
            </span>
          </>
        )}
      </section>
    );

  return (
    <section className={$["card-box"]}>
      {schedules.map(({ id, content, startDate, endDate }) => (
        <CollegeCard key={id} {...{ content, startDate, endDate }} />
      ))}
      {Y > CALLENDAR_UNVISIBLE_POINT && (
        <button
          className={$["floating-button"]}
          type="button"
          onClick={() => animateScroll.scrollToTop({ duration: 250 })}
        >
          <Arrow width={10} height={24} color="#828282" />
        </button>
      )}
    </section>
  );
}

export default CardBox;
