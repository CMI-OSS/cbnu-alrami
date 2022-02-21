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
  | "calendar";

export enum ScraperState {
  Running = "Running",
  Pause = "Pause",
  Stopped = "Stopped",
  Error = "Error",
}

export interface ScraperLog {
  prefix?: "INFO" | "WARN" | "ERROR";
  message: string;
}
