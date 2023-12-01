import dayjs, { Dayjs } from "dayjs";
import { useBookmarkSchedulesQuery } from "src/hooks/api/schedule";

import Schedule from "../Schedule";
import $ from "./style.module.scss";

type Props = {
  today: Dayjs;
};

export default function ScheduleContainer({ today }: Props) {
  const { data } = useBookmarkSchedulesQuery();

  const schedules =
    data?.filter((schedule) => {
      const today = dayjs();

      const { startDateTime, endDateTime } = schedule;

      if (endDateTime && today.isAfter(endDateTime, "date")) return false;
      if (today.isBefore(startDateTime, "date")) return false;
      if (!endDateTime && today.isAfter(startDateTime, "date")) return false;

      return true;
    }) ?? [];

  if (!data) return null;

  return (
    <div className={$.schedule}>
      {schedules.map(({ id, content, startDateTime, endDateTime }) => {
        return (
          <Schedule
            key={id}
            {...{
              content,
              startDateTime: startDateTime.format("YYYY-MM-DD"),
              endDateTime: endDateTime?.format("YYYY-MM-DD"),
              today,
            }}
          />
        );
      })}
    </div>
  );
}
