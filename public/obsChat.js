const socket = io();

//dom elements
let output = document.getElementById("output");

let queue = [];

function deleteFirstParrafo() {
  output.style.display = "none";
  queue.shift();
  if (queue.length > 0) {
    printParrafo(queue[0]);
  }
}

function printParrafo(data) {
  output.innerHTML = `
    <center>
      <img width=200px src='donaciones.gif'>
      <h1>${data.username} gracias por tu donación de S/ ${data.donation}:</h1>
    </center>
    <h1>Mensaje: ${data.message}</h1>
  `;
  output.style.display = "block";
  setTimeout(deleteFirstParrafo, 10000);
}

socket.on("chat:message", function (data) {
  queue.push(data);
  if (queue.length === 1) {
    printParrafo(data);
  }
});
