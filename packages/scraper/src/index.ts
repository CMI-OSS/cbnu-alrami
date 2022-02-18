import "src/common/env";

import { Server, Socket } from "socket.io";
import { socketHandler } from "./handler";

const io = new Server({ cors: { origin: "*" } });

const onSocketConnection = (socket: Socket) => {
  socket.onAny((event, payload) => socketHandler({ event, payload }));
};

io.on("connection", onSocketConnection);
io.listen(8070);
