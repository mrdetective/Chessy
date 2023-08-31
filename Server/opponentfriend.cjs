const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
});
app.use(express.json());
app.use(cors());

io.on("connection", async (socket) => {
  const roomname = await socket.handshake.query.roomname;
  socket.join(roomname);
  socket.on("move", function (from, to, positions, ExtraPiece) {
    socket.to(roomname).emit("recieve-move", from, to, positions, ExtraPiece);
  });
  socket.on("join-create", function (username) {
    socket.to(roomname).emit("join-create", username);
  });
  socket.on("create-join", function (username) {
    socket.to(roomname).emit("create-join", username);
  });
  socket.on("disconnect", function () {
    socket.to(roomname).emit("Player-left");
  });
});

app.post("/checkServer", (req, res) => {
  const {roomname} = req.body;
  const roomInfo =
    io.sockets.adapter.rooms.has(roomname) + " " + io.engine.clientsCount;
  res.json(roomInfo);
});

const PORT = 3000;
server.listen(PORT, () => {});
