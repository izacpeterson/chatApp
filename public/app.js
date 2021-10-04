/** @format */

var socket = io();

let messages = document.getElementById("messages");
let form = document.getElementById("form");
let input = document.getElementById("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    console.log("sent");
  }
});

socket.on("chat message", (msg) => {
  messages.innerHTML += `<li>${msg}</li>`;
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

setInterval(checkPos, 1000);
