import {
  isScraperStateChange,
  ScraperChangeStateMessage,
  SocketMessage,
} from "@shared/types/Socket";
import { socket } from "../lib/socket";
import { useAppDispatch } from "../store";
import { changeState } from "../store/scraperSlice";

export default function useSocket() {
  const dispatch = useAppDispatch();
  socket.onAny((event, payload) => socketHandler({ event, payload }));

  const socketHandler = (message: SocketMessage) => {
    if (isScraperStateChange(message)) handleScraperChange(message);
  };

  const handleScraperChange = ({
    payload: scraper,
  }: ScraperChangeStateMessage) => {
    dispatch(changeState(scraper));
  };
}
