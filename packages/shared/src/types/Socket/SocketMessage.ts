import { APPEND_LOG_EVENT } from "./AppendLog";
import { CHANGE_SCENARIO_QUEUE_EVENT } from "./ChangeScenarioQueue";
import { CHANGE_SCRAPER_STATE_EVENT } from "./ChangeScraperState";
import { COMMAND_SCRAPER_EVENT } from "./CommandScraper";
import { INIT_SCRAPER_EVENT } from "./InitScraper";

const SOCKET_EVENT = {
  ...COMMAND_SCRAPER_EVENT,
  CHANGE_SCRAPER_STATE_EVENT,
  CHANGE_SCENARIO_QUEUE_EVENT,
  INIT_SCRAPER_EVENT,
  APPEND_LOG_EVENT,
} as const;

export type SOCKET_EVENT = typeof SOCKET_EVENT[keyof typeof SOCKET_EVENT];
export type SocketMessage<E = SOCKET_EVENT, P = any> = {
  event: E;
  payload: P;
};
