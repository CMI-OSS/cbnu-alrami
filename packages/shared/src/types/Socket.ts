import { ScraperType } from "@shared/types";

export interface SocketMessage<E, P> {
  event: E;
  payload?: P;
}

export enum ScraperManageEvent {
  START_SCRAPER = "START_SCRAPER",
  STOP_SCRAPER = "STOP_SCRAPER",
}
export type ScraperManage = SocketMessage<ScraperManageEvent, ScraperType>;
