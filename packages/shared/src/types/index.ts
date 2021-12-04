export type Element = {
  className?: string;
};

export type ScenarioConfig = {
  id: number;
  title: string;
  subTitle?: string;
  status: string;
  group?: string;
  tags: string[];
};

export enum StatusConfig {
  running = "실행중",
  waiting = "대기중",
  error = "장애",
}
