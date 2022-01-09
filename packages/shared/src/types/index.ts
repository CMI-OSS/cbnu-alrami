export type Element = {
  className?: string;
};

export type ScenarioStateType = "clean" | "warning" | "error" | "excluded";

export type ScenarioTurnType = "prev" | "current" | "next";

export type ScenarioType = {
  id: number;
  title: string;
  subTitle?: string;
  state: ScenarioStateType;
  group?: string;
  tags: string[];
};

export type ScenarioQueueType = {
  id: number;
  title: string;
  turn: ScenarioTurnType;
};

export type ExcutionLogType = {
  scraper: string;
  result: string;
  commands?: string[];
};

export type ScraperType =
  | "notice"
  | "studentCafeteria"
  | "domitoryCafeteria"
  | "collegeSchedule";
