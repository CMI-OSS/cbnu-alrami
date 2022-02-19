import { ScraperState, ScraperType } from "@shared/types";
import {
  ScraperChangeStateMessage,
  SCRAPER_CHANGE_EVENT,
  SocketMessage,
} from "@shared/types/Socket";
import { Server, Socket } from "socket.io";
import { socketHandler } from "./handler";

const io = new Server({ cors: { origin: "*" } });

const onSocketConnection = (socket: Socket) => {
  socket.onAny((event, payload) => socketHandler({ event, payload }));
};

io.on("connection", onSocketConnection);
io.listen(8070);

function emit<T extends SocketMessage>({ event, payload }: T) {
  io.emit(event, payload);
}

export const changeScraperState = (type: ScraperType, state: ScraperState) =>
  emit<ScraperChangeStateMessage>({
    event: SCRAPER_CHANGE_EVENT.STATE_CHANGE,
    payload: {
      type,
      state,
    },
  });
