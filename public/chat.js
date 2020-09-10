const socket = io();

//dom elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let donation = document.getElementById("donation");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

let queue = [];

btn.addEventListener("click", function () {
  socket.emit("chat:message", {
    username: username.value,
    message: message.value,
    donation: donation.value,
  });
});

let i = 0;

function debugg() {
  console.log(i++);
}

function deleteFirstParrafo() {
  debugg();
  output.style.display = "none";
  queue.shift();
  if (queue.length > 0) {
    printParrafo(queue[0]);
  }
}

function playAudio(text) {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);
  synth.speak(utterThis);
}

function printParrafo(data) {
  output.innerHTML = `
    <center>
      <img width=200px src='donaciones.gif'>
      <h2>${data.username} gracias por tu donación de S/ ${data.donation}:</h2>
    </center>
    <p>
      <strong>Mensaje</strong>: ${data.message}
    </p>
  `;
  output.style.display = "block";
  playAudio(data.message);
  setTimeout(deleteFirstParrafo, 10000);
}

socket.on("chat:message", function (data) {
  queue.push(data);
  if (queue.length === 1) {
    printParrafo(data);
  }
});
