const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});

io.on("connection", async (socket) => {
  const roomname = await socket.handshake.query.roomname;
  socket.join(roomname);
  socket.on("move", function (from, to) {
    socket.to(roomname).emit(`recieve-move`, from, to);
  });
});
