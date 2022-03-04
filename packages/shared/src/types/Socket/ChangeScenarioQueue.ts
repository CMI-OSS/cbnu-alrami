import { ScraperType } from "../index";
import { SocketMessage } from "./SocketMessage";

export const CHANGE_SCENARIO_QUEUE_EVENT =
  "CHANGE_SCENARIO_QUEUE_EVENT" as const;
export type CHANGE_SCENARIO_QUEUE_EVENT = typeof CHANGE_SCENARIO_QUEUE_EVENT;

export type ChangeScenarioQueuePayload = {
  type: ScraperType;
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
export type ChangeScenarioQueueMessage = SocketMessage<
  CHANGE_SCENARIO_QUEUE_EVENT,
  ChangeScenarioQueuePayload
>;
export function isChangeScenarioQueueMessage(
  message: SocketMessage,
): message is ChangeScenarioQueueMessage {
  return message.event === CHANGE_SCENARIO_QUEUE_EVENT;
}
