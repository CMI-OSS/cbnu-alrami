import { ScraperType } from "@shared/types";
import { io } from "socket.io-client";
import {
  ScraperCommandMessage,
  SocketMessage,
  SCRAPER_COMMAND_EVENT,
} from "@shared/types/Socket";

const socket = io(
  `${window.location.protocol}//${window.location.hostname}:8070`,
);

function emit<T extends SocketMessage>({ event, payload }: T) {
  socket.emit(event, payload);
}

const startScraper = (scraperType: ScraperType) =>
  emit<ScraperCommandMessage>({
    event: SCRAPER_COMMAND_EVENT.START_SCRAPER,
    payload: scraperType,
  });

const stopScraper = (scraperType: ScraperType) =>
  emit<ScraperCommandMessage>({
    event: SCRAPER_COMMAND_EVENT.STOP_SCRAPER,
    payload: scraperType,
  });

const pauseScraper = (scraperType: ScraperType) =>
  emit<ScraperCommandMessage>({
    event: SCRAPER_COMMAND_EVENT.PAUSE_SCRAPER,
    payload: scraperType,
  });

const restartScraper = (scraperType: ScraperType) =>
  emit<ScraperCommandMessage>({
    event: SCRAPER_COMMAND_EVENT.RESTART_SCRAPER,
    payload: scraperType,
  });

export { socket, startScraper, stopScraper, pauseScraper, restartScraper };
