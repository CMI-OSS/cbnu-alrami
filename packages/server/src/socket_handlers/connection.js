const connectionHandler = (socket) => {
  if (socket) {
    console.log("User connected.");
  }

  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });
};

export default connectionHandler;
