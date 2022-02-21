import {
  isLog,
  isScraperStateChange,
  LogMessage,
  ScraperChangeStateMessage,
  SocketMessage,
} from "@shared/types/Socket";
import { socket } from "../lib/socket";
import { useAppDispatch } from "../store";
import { appendLog, changeState } from "../store/scraperSlice";

export default function useSocket() {
  const dispatch = useAppDispatch();
  socket.onAny((event, payload) => socketHandler({ event, payload }));

  const socketHandler = (message: SocketMessage) => {
    if (isScraperStateChange(message)) handleScraperChange(message);
    if (isLog(message)) handleScraperLog(message);
  };

  const handleScraperChange = ({
    payload: scraper,
  }: ScraperChangeStateMessage) => {
    dispatch(changeState(scraper));
  };

  const handleScraperLog = ({ payload }: LogMessage) => {
    dispatch(appendLog(payload));
  };
}
