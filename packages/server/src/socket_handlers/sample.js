const sampleHandler = (socket) => {
  socket.on("time", () => {
    socket.emit("serverTime", new Date().getTime());
  });
};

export default sampleHandler;
