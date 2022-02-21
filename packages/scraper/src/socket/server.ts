import { ScraperState, ScraperType } from "@shared/types";
import {
  ChangeScenarioQueueMessage,
  ChangeScenarioQueuePayload,
  CHANGE_SCENARIO_QUEUE_EVENT,
  InitScraperMessage,
  INIT_SCRAPER_EVENT,
  LogMessage,
  LogPayload,
  ScraperChangeStateMessage,
  SCRAPER_CHANGE_EVENT,
  SocketMessage,
} from "@shared/types/Socket";
import { Server, Socket } from "socket.io";
import NoticeScraper from "src/scrapers/NoticeScraper";
import CalendarScrpaer from "src/scrapers/CalendarScraper";
import CafeteriaScraper from "src/scrapers/CafeteriaScraper";
import DomitoryScraper from "src/scrapers/DomitoryScraper";
import { socketHandler } from "./handler";
import { LOG_EVENT } from "../../../shared/src/types/Socket";

const io = new Server({ cors: { origin: "*" } });

const onSocketConnection = (socket: Socket) => {
  initScraper(socket);
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

export const initScraper = (socket: Socket) => {
  [ NoticeScraper, CalendarScrpaer, CafeteriaScraper, DomitoryScraper ].forEach(
    (scraper) => {
      emit<InitScraperMessage>(socket, {
        event: INIT_SCRAPER_EVENT.INIT_SCRAPER_EVENT,
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
export const changeScraperState = (type: ScraperType, state: ScraperState) =>
  emitAll<ScraperChangeStateMessage>({
    event: SCRAPER_CHANGE_EVENT.STATE_CHANGE,
    payload: {
      type,
      state,
    },
  });

export const sendLog = (payload: LogPayload) =>
  emitAll<LogMessage>({
    event: LOG_EVENT.LOG_EVENT,
    payload,
  });

export const changeScenarioQueue = (payload: ChangeScenarioQueuePayload) =>
  emitAll<ChangeScenarioQueueMessage>({
    event: CHANGE_SCENARIO_QUEUE_EVENT.CHANGE_SCENARIO_QUEUE_EVENT,
    payload,
  });
