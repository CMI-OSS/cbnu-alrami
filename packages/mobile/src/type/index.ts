import { Dayjs } from "dayjs";

export type Restaurant =
  | "본관"
  | "양성재"
  | "양진재"
  | "별빛식당"
  | "은하수식당"
  | "한빛식당"
  | "표시 안함";

export type Menu = { id: number; name: string };

export type CalendarInfo = {
  year: number;
  month: number;
  date?: number;
  day?: number;
};

export type Schedule = Omit<res.Schedule, "startDate" | "endDate"> & {
  startDate: Dayjs;
  endDate: Dayjs | null;
};
