export type Element = {
  className?: string;
};

export type ScenarioStateType = "clean" | "warning" | "error" | "excluded";

export type ScenarioType = {
  id: number;
  title: string;
  subTitle?: string;
  state: ScenarioStateType;
  group?: string;
  tags: string[];
};

export type ScraperType =
  | "notice"
  | "cafeteria"
  | "domitory"
  | "calendar"
  | "covid";

export enum ScraperState {
  Running = "Running",
  Pause = "Pause",
  Stopped = "Stopped",
  Error = "Error",
}

export type ScraperLog = {
  prefix?: "INFO" | "WARN" | "ERROR";
  message: string;
};

export type BoardType = {
  name: string;
};
