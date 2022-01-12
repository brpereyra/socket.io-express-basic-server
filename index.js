const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io");

// socket.io config
const socket = io(http, {
  cors: {
    origin: "*",
  },
});

app.use(express.static(__dirname + "/public"));
// when a client connects
socket.on("connection", function (socket) {
  console.log("a user connected");
  // when a user send a message
  socket.on("msg", (data) => {
    console.log("mesaje del cliente", data);
    socket.broadcast.emit("msg", data);
  });
  // when the user disconnects
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});
// start the server
http.listen(3000, () => {
  console.log("listening on port 3000");
});
