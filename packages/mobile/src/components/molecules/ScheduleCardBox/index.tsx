import { Dayjs } from "dayjs";
import { Schedule, ScheduleType } from "src/page/Calendar";

import CollegeCard from "../CollegeCard";
import PersonalCard from "../PersonalCard";
import $ from "./style.module.scss";

type Props = {
  scheduleType: ScheduleType;
  schedules: Schedule[];
  selectedDate: Dayjs;
};

function ScheduleBox({ scheduleType, schedules, selectedDate }: Props) {
  if (schedules.length === 0)
    return (
      <section className={$["empty-box"]}>
        <div>(그림)</div>
        <span className={$.description}>오늘은 일정이 없어요</span>
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
    </section>
  );
}

export default ScheduleBox;
