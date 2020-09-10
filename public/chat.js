const socket = io();

//dom elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let donation = document.getElementById("donation");
let btn = document.getElementById("send");
let output = document.getElementById("output");

let queue = [];

btn.addEventListener("click", function () {
  socket.emit("chat:message", {
    username: username.value,
    message: message.value,
    donation: donation.value,
  });
});

function deleteFirstParrafo() {
  var last = output.getElementsByTagName("p").length;
  var last_p = output.getElementsByTagName("p")[last - 1];
  output.removeChild(last_p);
  queue.shift();
  if (queue.length > 0) {
    playAudio(queue[0].message);
    setTimeout(deleteFirstParrafo, 10000);
  }
}

function playAudio(text) {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);
  synth.speak(utterThis);
}

function printParrafo(data) {
  output.innerHTML =
    `
        <p>
            <strong>${data.username}</strong>: ${data.message}
        </p>
    ` + output.innerHTML;
  if (queue.length === 1) {
    playAudio(data.message);
    setTimeout(deleteFirstParrafo, 10000);
  }
}

socket.on("chat:message", function (data) {
  queue.push(data);
  printParrafo(data);
});
