export type Restaurant =
  | "본관"
  | "양성재"
  | "양진재"
  | "별빛식당"
  | "은하수식당"
  | "한빛식당"
  | "표시 안함";

export type Menu<T, U> = { id: T; name: U };

export type CalendarInfo = {
  year: number;
  month: number;
  date?: number;
  day?: number;
};