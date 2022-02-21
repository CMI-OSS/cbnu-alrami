import { ScraperLog, ScraperState, ScraperType } from "../index";
import { SocketMessage } from "./SocketMessage";

export const INIT_SCRAPER_EVENT = "INIT_SCRAPER_EVENT" as const;

export type INIT_SCRAPER_EVENT = typeof INIT_SCRAPER_EVENT;

export type InitScraperPayload = {
  type: ScraperType;
  scraper: {
    state: ScraperState;
    logs: Array<ScraperLog>;
    prevScenario: {
      title: string;
    };
    currentScenario: {
      title: string;
    };
    nextScenario: {
      title: string;
    };
  };
};

export type InitScraperMessage = SocketMessage<
  INIT_SCRAPER_EVENT,
  InitScraperPayload
>;

export function isInitScraperMessage(
  message: SocketMessage,
): message is InitScraperMessage {
  return message.event === INIT_SCRAPER_EVENT;
}
