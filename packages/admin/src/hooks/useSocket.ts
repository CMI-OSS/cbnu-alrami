import {
  isInitScraperMessage,
  isLog,
  isScraperStateChange,
  LogMessage,
  ScraperChangeStateMessage,
  SocketMessage,
  InitScraperMessage,
  isChangeScenarioQueue,
  ChangeScenarioQueueMessage,
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
  socket.onAny((event, payload) => socketHandler({ event, payload }));

  const socketHandler = (message: SocketMessage) => {
    if (isInitScraperMessage(message)) handleInitScraper(message);
    if (isScraperStateChange(message)) handleScraperChange(message);
    if (isLog(message)) handleScraperLog(message);
    if (isChangeScenarioQueue(message)) handleChangeScenarioQueue(message);
  };

  const handleInitScraper = ({ payload }: InitScraperMessage) => {
    dispatch(init(payload));
  };

  const handleScraperChange = ({
    payload: scraper,
  }: ScraperChangeStateMessage) => {
    dispatch(changeState(scraper));
  };

  const handleScraperLog = ({ payload }: LogMessage) => {
    dispatch(appendLog(payload));
  };

  const handleChangeScenarioQueue = ({
    payload,
  }: ChangeScenarioQueueMessage) => {
    dispatch(changeScenarioQueue(payload));
  };
}
