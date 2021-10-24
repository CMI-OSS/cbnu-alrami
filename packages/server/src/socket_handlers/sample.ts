import { Socket } from "socket.io";

const sampleHandler = (socket: Socket) => {
  socket.on("time", () => {
    socket.emit("serverTime", new Date().getTime());
  });
};

export default sampleHandler;
