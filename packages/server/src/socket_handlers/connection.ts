import { Socket } from "socket.io";

const connectionHandler = (socket: Socket) => {
  if (socket) {
    console.log("User connected.");
  }

  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });
};

export default connectionHandler;
