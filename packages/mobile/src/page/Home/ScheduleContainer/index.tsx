import { Dayjs } from "dayjs";
import { useTodaySchedulesQuery } from "src/hooks/api/schedule";

import Schedule from "../Schedule";
import $ from "./style.module.scss";

type Props = {
  today: Dayjs;
};

export default function ScheduleContainer({ today }: Props) {
  const { data } = useTodaySchedulesQuery(today.format("YYYY-MM-DD"));

  if (!data) return null;

  return (
    <div className={$.schedule}>
      {data.schedules.map(({ id, content, startDateTime, endDateTime }) => {
        return (
          <Schedule
            key={id}
            {...{ content, startDateTime, endDateTime, today }}
          />
        );
      })}
    </div>
  );
}
