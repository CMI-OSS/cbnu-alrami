import { ScraperType } from "@shared/types";

export interface SocketMessage<E, P> {
  event: E;
  payload?: P;
}

export enum ScraperManageEvent {
  START_SCRAPER = "START_SCRAPER",
  STOP_SCRAPER = "STOP_SCRAPER",
  PAUSE_SCRAPER = "PAUSE_SCRAPER",
  RESTART_SCRAPER = "RESTART_SCRAPER",
}
export type ScraperManage = SocketMessage<ScraperManageEvent, ScraperType>;
