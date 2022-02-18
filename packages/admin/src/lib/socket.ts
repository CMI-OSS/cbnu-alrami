import { ScraperType } from "@shared/types";
import { io } from "socket.io-client";
import {
  ScraperManage,
  ScraperManageEvent,
  SocketMessage,
} from "@shared/types/Socket";

const socket = io(
  `${window.location.protocol}//${window.location.hostname}:8070`,
);

function emit<T extends SocketMessage<string, any>>({ event, payload }: T) {
  socket.emit(event, payload);
}

export const startScraper = (scraperType: ScraperType) =>
  emit<ScraperManage>({
    event: ScraperManageEvent.START_SCRAPER,
    payload: scraperType,
  });

export const stopScraper = (scraperType: ScraperType) =>
  emit<ScraperManage>({
    event: ScraperManageEvent.STOP_SCRAPER,
    payload: scraperType,
  });
