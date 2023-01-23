import axios from "../common/http";

interface CreateScheduleProps {
  content: string;
  startDate: string;
  endDate?: string | null;
  isHoliday?: boolean;
  priority?: number;
}

export function createSchedule(schedule: CreateScheduleProps) {
  return axios.post(`/schedules`, schedule);
}
