import "src/common/env";
import NoticeScraper from "src/scrapers/NoticeScraper";

import { Server, Socket } from "socket.io";
import { ScraperType } from "@shared/types";
import { SocketMessageType } from "./types";

const io = new Server(Number(process.env.SOCKET_SERVER_PORT) ?? 3000);
