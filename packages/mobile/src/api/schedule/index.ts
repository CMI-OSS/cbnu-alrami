import http from "src/api/core";

export const getFullSchedules = (year: number): Promise<res.Schedule[]> => {
  return http.get(`/schedules?startDate=${year}-01-01&endDate=${year}-12-31`);
};

export const getTodaySchedules = (today: string): Promise<res.Schedule[]> => {
  return http.get(`/schedules?startDate=${today}`);
};
