import { useQuery } from "react-query";

import axios from "axios";

const fetchSchedules = () => {
  return axios.get(
    "https://dev-server.cmi.kro.kr/schedules?startDate=2022-01-01",
  );
};

export const useSchedule = () => {
  const response = useQuery<any, void>("schedule", fetchSchedules);
  return response;
};
