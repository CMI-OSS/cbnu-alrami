import { ScraperLog, ScraperState, ScraperType } from "@shared/types";

export const SCRAPER_COMMAND_EVENT = {
  START_SCRAPER: "START_SCRAPER",
  STOP_SCRAPER: "STOP_SCRAPER",
  PAUSE_SCRAPER: "PAUSE_SCRAPER",
  RESTART_SCRAPER: "RESTART_SCRAPER",
} as const;
export type SCRAPER_COMMAND_EVENT =
  typeof SCRAPER_COMMAND_EVENT[keyof typeof SCRAPER_COMMAND_EVENT];

export const SCRAPER_CHANGE_EVENT = {
  STATE_CHANGE: "STATE_CHANGE",
} as const;
export type SCRAPER_CHANGE_EVENT =
  typeof SCRAPER_CHANGE_EVENT[keyof typeof SCRAPER_CHANGE_EVENT];

export const LOG_EVENT = {
  LOG_EVENT: "LOG_EVENT",
} as const;
export type LOG_EVENT = typeof LOG_EVENT[keyof typeof LOG_EVENT];

export const INIT_SCRAPER_EVENT = {
  INIT_SCRAPER_EVENT: "INIT_SCRAPER_EVENT",
};

export type INIT_SCRAPER_EVENT =
  typeof INIT_SCRAPER_EVENT[keyof typeof INIT_SCRAPER_EVENT];

const SOCKET_EVENT = {
  ...SCRAPER_COMMAND_EVENT,
  ...SCRAPER_CHANGE_EVENT,
  ...LOG_EVENT,
  ...INIT_SCRAPER_EVENT,
} as const;

type SOCKET_EVENT = typeof SOCKET_EVENT[keyof typeof SOCKET_EVENT];
export interface SocketMessage<E = SOCKET_EVENT, P = any> {
  event: E;
  payload: P;
}

export type ScraperCommandMessage = SocketMessage<
  SCRAPER_COMMAND_EVENT,
  ScraperType
>;

export type ScraperChangePayload = {
  type: ScraperType;
  state: ScraperState;
};
export type ScraperChangeStateMessage = SocketMessage<
  SCRAPER_CHANGE_EVENT,
  ScraperChangePayload
>;

export type LogPayload = {
  type: ScraperType;
  log: ScraperLog;
};
export type LogMessage = SocketMessage<LOG_EVENT, LogPayload>;

export type InitScraperPayload = {
  type: ScraperType;
  scraper: {
    state: ScraperState;
    logs: Array<ScraperLog>;
  };
};
export type InitScraperMessage = SocketMessage<
  INIT_SCRAPER_EVENT,
  InitScraperPayload
>;

export function isScraperCommand(
  message: SocketMessage,
): message is ScraperCommandMessage {
  return Object.keys(SCRAPER_COMMAND_EVENT).includes(message.event);
}

export function isScraperStateChange(
  message: SocketMessage,
): message is ScraperChangeStateMessage {
  return message.event === SCRAPER_CHANGE_EVENT.STATE_CHANGE;
}

export function isLog(message: SocketMessage): message is LogMessage {
  return message.event === LOG_EVENT.LOG_EVENT;
}

export function isInitScraperMessage(
  message: SocketMessage,
): message is InitScraperMessage {
  return message.event === INIT_SCRAPER_EVENT.INIT_SCRAPER_EVENT;
}
