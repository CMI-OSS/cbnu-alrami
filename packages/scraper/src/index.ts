import "src/common/env";
import NoticeScraper from "src/scrapers/NoticeScraper";
import CalendarScrpaer from "src/scrapers/CalendarScraper";
import CafeteriaScraper from "src/scrapers/CafeteriaScraper";
import DomitoryScraper from "src/scrapers/DomitoryScraper";

import { Server, Socket } from "socket.io";
import { ScraperType } from "@shared/types";
import { SocketMessageType } from "@shared/types/Socket";

const io = new Server({ cors: { origin: "*" } });

const onSocketConnection = (socket: Socket) => {
  socket.on(SocketMessageType.START_SCRAPER, handleStartScraper);
};

const handleStartScraper = (scraperType: ScraperType) => {
  switch (scraperType) {
    case "notice":
      NoticeScraper.start();
      break;
    case "collegeSchedule":
      CalendarScrpaer.start();
      break;
    case "domitoryCafeteria":
      DomitoryScraper.start();
      break;
    case "studentCafeteria":
      CafeteriaScraper.start();
      break;
    default:
      throw new Error(`Not found "${scraperType}" scraper `);
      break;
  }
};

io.on("connection", onSocketConnection);
io.listen(8070);
