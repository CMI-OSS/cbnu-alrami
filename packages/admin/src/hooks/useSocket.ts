import {
  AppendLogMessage,
  isAppendLogMessage,
  ChangeScenarioQueueMessage,
  isChangeScenarioQueueMessage,
  ChangeScraperStateMessage,
  isChangeScraperStateMessage,
  InitScraperMessage,
  isInitScraperMessage,
  SocketMessage,
  SOCKET_EVENT,
} from "@shared/types/Socket";

import { socket } from "../lib/socket";
import { useAppDispatch } from "../store";
import {
  init,
  appendLog,
  changeState,
  changeScenarioQueue,
} from "../store/scraperSlice";

export default function useSocket() {
  const dispatch = useAppDispatch();
  socket.onAny((event: SOCKET_EVENT, payload: any) =>
    socketHandler({ event, payload }),
  );

  const socketHandler = (message: SocketMessage) => {
    if (isInitScraperMessage(message)) handleInitScraper(message);
    if (isChangeScraperStateMessage(message)) handleChangeScraperState(message);
    if (isAppendLogMessage(message)) handleAppendLog(message);
    if (isChangeScenarioQueueMessage(message))
      handleChangeScenarioQueue(message);
  };

  const handleInitScraper = ({ payload }: InitScraperMessage) => {
    dispatch(init(payload));
  };

  const handleChangeScraperState = ({
    payload: scraper,
  }: ChangeScraperStateMessage) => {
    dispatch(changeState(scraper));
  };

  const handleAppendLog = ({ payload }: AppendLogMessage) => {
    dispatch(appendLog(payload));
  };

  const handleChangeScenarioQueue = ({
    payload,
  }: ChangeScenarioQueueMessage) => {
    dispatch(changeScenarioQueue(payload));
  };
}
