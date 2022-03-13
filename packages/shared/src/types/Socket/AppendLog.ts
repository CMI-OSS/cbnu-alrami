import { ScraperLog, ScraperType } from "../index";
import { SocketMessage } from "./SocketMessage";

export const APPEND_LOG_EVENT = "APPEND_LOG_EVENT" as const;
export type APPEND_LOG_EVENT = typeof APPEND_LOG_EVENT;

export type AppendLogPayload = {
  type: ScraperType;
  log: ScraperLog;
};
export type AppendLogMessage = SocketMessage<
  APPEND_LOG_EVENT,
  AppendLogPayload
>;

export function isAppendLogMessage(
  message: SocketMessage,
): message is AppendLogMessage {
  return message.event === APPEND_LOG_EVENT;
}
