import {
  AppendLogMessage,
  isAppendLogMessage,
} from "@shared/types/Socket/AppendLog";
import {
  ChangeScenarioQueueMessage,
  isChangeScenarioQueueMessage,
} from "@shared/types/Socket/ChangeScenarioQueue";
import {
  ChangeScraperStateMessage,
  isChangeScraperStateMessage,
} from "@shared/types/Socket/ChangeScraperState";
import {
  InitScraperMessage,
  isInitScraperMessage,
} from "@shared/types/Socket/InitScraper";
import { SocketMessage } from "@shared/types/Socket/SocketMessage";
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
  socket.onAny((event, payload) => socketHandler({ event, payload }));

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
