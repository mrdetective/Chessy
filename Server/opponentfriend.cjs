const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});

io.on("connection", (socket) => {
  console.log("New Socket Connection");
  socket.on("move", function (from, to) {
    socket.broadcast.emit("recieve-move", from, to);
  });
  socket.on("turn-change", function (color) {
    socket.broadcast.emit("color-change", color);
  });
  socket.on("color-assign", function (color) {
    if (color == "white") socket.broadcast.emit("get-color", "black");
    else socket.broadcast.emit("get-color", "white");
  });
});
