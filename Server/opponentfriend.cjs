const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});

io.on("connection", (socket) => {
  console.log("New Socket Connection");
  socket.on("move", function (from, to, turn) {
    if (turn == "white")
      socket.broadcast.emit("recieve-move", from, to, "black");
    else socket.broadcast.emit("recieve-move", from, to, "white");
  });
  socket.on("turn-change", function (color) {
    socket.broadcast.emit("turn-change", color);
  });
});
