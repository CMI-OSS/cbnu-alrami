import { useQuery } from "react-query";

import caxios from "src/api/caxios";

const fetchSchedules = () => {
  return caxios.get("/schedules?startDate=2022-01-01");
};

export const useSchedule = () => {
  const response = useQuery<any, void>("schedule", fetchSchedules);
  return response;
};
