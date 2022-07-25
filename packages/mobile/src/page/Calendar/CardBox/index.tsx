import { animateScroll } from "react-scroll";

import { Dayjs } from "dayjs";
import { Arrow } from "src/components/atoms/icon/Arrow";
import useScroll from "src/hooks/useScroll";
import { Schedule, ScheduleType } from "src/page/Calendar";

import CollegeCard from "../CollegeCard";
import PersonalCard from "../PersonalCard";
import $ from "./style.module.scss";

const CALLENDAR_UNVISIBLE_POINT = 320;

type Props = {
  scheduleType: ScheduleType;
  schedules: Schedule[];
  selectedDate: Dayjs;
};

function CardBox({ scheduleType, schedules, selectedDate }: Props) {
  const { Y } = useScroll();

  if (schedules.length === 0)
    return (
      <section className={$["empty-box"]}>
        <span className={$.discription}>오늘은 일정이 없어요</span>
      </section>
    );

  return (
    <section className={$["card-box"]}>
      {schedules.map(({ id, content, startDate, endDate }) =>
        scheduleType === "college" ? (
          <CollegeCard key={id} {...{ content, startDate, endDate }} />
        ) : (
          <PersonalCard
            key={id}
            {...{
              content,
              startDate,
              endDate,
              selectedDate,
            }}
          />
        ),
      )}
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
