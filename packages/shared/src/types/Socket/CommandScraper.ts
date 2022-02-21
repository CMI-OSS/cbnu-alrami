import { ScraperType } from "../index";
import { SocketMessage } from "./SocketMessage";

export const COMMAND_SCRAPER_EVENT = {
  START_SCRAPER: "START_SCRAPER",
  STOP_SCRAPER: "STOP_SCRAPER",
  PAUSE_SCRAPER: "PAUSE_SCRAPER",
  RESTART_SCRAPER: "RESTART_SCRAPER",
} as const;

export type COMMAND_SCRAPER_EVENT =
  typeof COMMAND_SCRAPER_EVENT[keyof typeof COMMAND_SCRAPER_EVENT];

export type CommandScraperMessage = SocketMessage<
  COMMAND_SCRAPER_EVENT,
  ScraperType
>;

export function isCommandScraperMessage(
  message: SocketMessage,
): message is CommandScraperMessage {
  return Object.keys(COMMAND_SCRAPER_EVENT).includes(message.event);
}
