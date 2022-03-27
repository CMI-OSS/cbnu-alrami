import { ScraperType } from "@shared/types";
import { io } from "socket.io-client";
import { SocketMessage } from "@shared/types/Socket/SocketMessage";
import {
  CommandScraperMessage,
  COMMAND_SCRAPER_EVENT,
} from "@shared/types/Socket/CommandScraper";

const socket = io(
  `${window.location.protocol}//${window.location.hostname}:8070`,
);

function emit<T extends SocketMessage>({ event, payload }: T) {
  socket.emit(event, payload);
}

const startScraper = (scraperType: ScraperType) =>
  emit<CommandScraperMessage>({
    event: COMMAND_SCRAPER_EVENT.START_SCRAPER,
    payload: scraperType,
  });

const stopScraper = (scraperType: ScraperType) =>
  emit<CommandScraperMessage>({
    event: COMMAND_SCRAPER_EVENT.STOP_SCRAPER,
    payload: scraperType,
  });

const pauseScraper = (scraperType: ScraperType) =>
  emit<CommandScraperMessage>({
    event: COMMAND_SCRAPER_EVENT.PAUSE_SCRAPER,
    payload: scraperType,
  });

const restartScraper = (scraperType: ScraperType) =>
  emit<CommandScraperMessage>({
    event: COMMAND_SCRAPER_EVENT.RESTART_SCRAPER,
    payload: scraperType,
  });

export { socket, startScraper, stopScraper, pauseScraper, restartScraper };
