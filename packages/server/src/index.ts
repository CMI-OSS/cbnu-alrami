import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import connectionHandler from "./socket_handlers/connection";
import sampleHandler from "./socket_handlers/sample";
import globalRouter from "./routers/global";

const PORT = 3000;
const IO_OPTIONS = {
  cors: {
    origin: ["http://localhost:4000"], // Client Server URL
    methods: ["GET", "POST"],
  },
};

const app = express();
const server = createServer(app);
const io = new Server(server, IO_OPTIONS);

app.use("/", globalRouter);

// TODO: 라우터 추가.

io.on("connection", (socket) => {
  connectionHandler(socket);
  sampleHandler(socket);

  // TODO: socket 이벤트 핸들러 추가.
});

const logger = () => console.log(`listening on http://localhost:${PORT}`);

// TODO: 충림이 서버에 맞는 로거 만들기.

server.listen(PORT, logger);
