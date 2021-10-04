/** @format */

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 5000;
const fs = require("fs");
const { json } = require("express");

let messages = fs.readFileSync("messages.json");
messages = JSON.parse(messages.toString()).messages;
console.log(messages);
let username;

app.use(express.static("public"));

app.get("/clear", (req, res) => {
  fs.writeFileSync("messages.json", '{"messages":[]}');
  let messages = fs.readFileSync("messages.json");
  messages = JSON.parse(messages.toString()).messages;
  console.log("cleared");
  res.send("done");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("past messages", JSON.stringify(messages));

  socket.on("chat message", (msg) => {
    messages.push(JSON.parse(msg));
    console.log(JSON.parse(msg));
    let messagesJSON = { messages: messages };
    fs.writeFile("messages.json", JSON.stringify(messagesJSON), (err) => {
      console.log(err);
    });
    io.emit("chat message", msg);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("server listening");
});
