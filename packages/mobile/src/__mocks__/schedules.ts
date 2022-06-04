const COLLEGE_SCHEDULES = [
  {
    id: 0,
    content: "학사일정",
    priority: 0,
    isHoliyday: 0 as const,
    startDate: "2022-05-30T00:00:00.000Z",
    endDate: "2022-06-10T00:00:00",
  },
  {
    id: 1,
    content: "공휴일",
    priority: 0,
    isHoliyday: 1 as const,
    startDate: "2022-06-15T00:00:00.000Z",
    endDate: null,
  },
];

const PERSONAL_SCHEDULES = [
  {
    id: 0,
    content: "개인 일정",
    priority: 1,
    isHoliyday: 0 as const,
    startDate: "2022-06-20T10:30:00.000Z",
    endDate: "2022-06-22T21:00:00.000Z",
  },
  {
    id: 1,
    content: "공휴일",
    priority: 0,
    isHoliyday: 1 as const,
    startDate: "2022-06-15T00:00:00.000Z",
    endDate: null,
  },
  {
    id: 2,
    content: "하루 일정",
    priority: 0,
    isHoliyday: 0 as const,
    startDate: "2022-06-24T09:00:00.000Z",
    endDate: "2022-06-24T10:00:00.000Z",
  },
];

export { COLLEGE_SCHEDULES, PERSONAL_SCHEDULES };
