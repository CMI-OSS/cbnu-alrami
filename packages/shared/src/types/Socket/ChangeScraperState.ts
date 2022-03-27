import { ScraperType, ScraperState } from "../index";
import { SocketMessage } from "./SocketMessage";

export const CHANGE_SCRAPER_STATE_EVENT = "CHANGE_SCRAPER_STATE_EVENT" as const;
export type CHANGE_SCRAPER_STATE_EVENT = typeof CHANGE_SCRAPER_STATE_EVENT;

export type ChangeScraperStatePayload = {
  type: ScraperType;
  state: ScraperState;
};

export type ChangeScraperStateMessage = SocketMessage<
  CHANGE_SCRAPER_STATE_EVENT,
  ChangeScraperStatePayload
>;

export function isChangeScraperStateMessage(
  message: SocketMessage,
): message is ChangeScraperStateMessage {
  return message.event === CHANGE_SCRAPER_STATE_EVENT;
}
