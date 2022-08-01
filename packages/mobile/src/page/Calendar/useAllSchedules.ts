import dayjs from "dayjs";
import { useScheduleCalendar } from "src/api/scheduleCalendar";

function useAllSchedules(year: number) {
  const { isLoading, error, data: scheduleData } = useScheduleCalendar(year);

  if (isLoading || scheduleData === undefined || error) return [];
  // TODO: 에러 핸들링 구현하기

  return scheduleData.data.map(
    ({ isHoliday, startDate, endDate, ...last }) => ({
      isHoliyday: !!isHoliday,
      startDate: dayjs(startDate),
      endDate: endDate ? dayjs(endDate) : null,
      ...last,
    }),
  );
}
export default useAllSchedules;
