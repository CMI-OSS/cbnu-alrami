import { ScraperState, ScraperType } from "@shared/types";
import { Server, Socket } from "socket.io";
import NoticeScraper from "src/scrapers/NoticeScraper";
import CalendarScrpaer from "src/scrapers/CalendarScraper";
import CafeteriaScraper from "src/scrapers/CafeteriaScraper";
import DomitoryScraper from "src/scrapers/DomitoryScraper";
import { SocketMessage } from "@shared/types/Socket/SocketMessage";
import {
  InitScraperMessage,
  INIT_SCRAPER_EVENT,
} from "@shared/types/Socket/InitScraper";
import {
  ChangeScraperStateMessage,
  CHANGE_SCRAPER_STATE_EVENT,
} from "@shared/types/Socket/ChangeScraperState";
import {
  AppendLogMessage,
  AppendLogPayload,
  APPEND_LOG_EVENT,
} from "@shared/types/Socket/AppendLog";
import {
  ChangeScenarioQueueMessage,
  ChangeScenarioQueuePayload,
  CHANGE_SCENARIO_QUEUE_EVENT,
} from "@shared/types/Socket/ChangeScenarioQueue";
import { socketHandler } from "./handler";

const io = new Server({ cors: { origin: "*" } });

const onSocketConnection = (socket: Socket) => {
  sendInitScraper(socket);
  socket.onAny((event, payload) => socketHandler({ event, payload }));
};

io.on("connection", onSocketConnection);
io.listen(8070);

function emit<T extends SocketMessage>(socket: Socket, { event, payload }: T) {
  socket.emit(event, payload);
}

function emitAll<T extends SocketMessage>({ event, payload }: T) {
  io.emit(event, payload);
}

export const sendInitScraper = (socket: Socket) => {
  [ NoticeScraper, CalendarScrpaer, CafeteriaScraper, DomitoryScraper ].forEach(
    (scraper) => {
      emit<InitScraperMessage>(socket, {
        event: INIT_SCRAPER_EVENT,
        payload: {
          type: scraper.type,
          scraper: {
            state: scraper.state,
            logs: scraper.logs,
            prevScenario: {
              title: scraper.prevScenario?.title ?? "",
            },
            currentScenario: {
              title: scraper.currentScenario?.title ?? "",
            },
            nextScenario: {
              title: scraper.nextScenario?.title ?? "",
            },
          },
        },
      });
    },
  );
};
export const sendChangeScraperState = (
  type: ScraperType,
  state: ScraperState,
) =>
  emitAll<ChangeScraperStateMessage>({
    event: CHANGE_SCRAPER_STATE_EVENT,
    payload: {
      type,
      state,
    },
  });

export const sendAppendLog = (payload: AppendLogPayload) =>
  emitAll<AppendLogMessage>({
    event: APPEND_LOG_EVENT,
    payload,
  });

export const sendChangeScenarioQueue = (payload: ChangeScenarioQueuePayload) =>
  emitAll<ChangeScenarioQueueMessage>({
    event: CHANGE_SCENARIO_QUEUE_EVENT,
    payload,
  });
