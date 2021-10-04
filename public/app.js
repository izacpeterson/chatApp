/** @format */

var socket = io();

socket.on("past messages", (pMsg) => {
  messages.innerHTML = "";
  pMsg = JSON.parse(pMsg);
  console.log(pMsg);

  pMsg.forEach((msg) => {
    messages.innerHTML += `<li>${msg.username}: ${msg.message}</li>`;
  });
});

let messages = document.getElementById("messages");
let form = document.getElementById("form");
let input = document.getElementById("input");
let username = document.getElementById("name");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    let msg = { username: username.value || "anon", message: input.value };
    socket.emit("chat message", JSON.stringify(msg));
    console.log("sent");
  }
  input.value = "";
});

socket.on("chat message", (msg) => {
  msg = JSON.parse(msg);
  messages.innerHTML += `<li>${msg.username}: ${msg.message}</li>`;
});

function success(position) {
  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);
  socket.emit("lat", position.coords.latitude);
  socket.emit("lon", position.coords.longitude);
}

function checkPos() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  }
}

// setInterval(checkPos, 1000);
