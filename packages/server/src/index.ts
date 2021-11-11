import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";
import logger from "./utils/logger";
import connectionHandler from "./socket_handlers/connection";
import sampleHandler from "./socket_handlers/sample";
import db from "../../shared/src/database/models";

const PORT = 4123;
const IO_OPTIONS = {
  cors: {
    origin: ["http://localhost:4000"], // Client Server URL
    methods: ["GET", "POST"],
  },
};

const server = createServer(app);
const io = new Server(server, IO_OPTIONS);

// TODO: 라우터 추가.

io.on("connection", (socket) => {
  connectionHandler(socket);
  sampleHandler(socket);

  // TODO: socket 이벤트 핸들러 추가.
});

// TODO: 충림이 서버에 맞는 로거 만들기.

server.listen(PORT);

server.on("listening", () => {
  const addr: any = server.address();
  logger.debug(`Server running on ${addr.address}${addr.port}`);
  db.sequelize
    .sync()
    .then(() => {
      console.log(" DB 연결 성공");
    })
    .catch((err: any) => {
      console.log("연결 실패");
      console.log(err);
    });
});
