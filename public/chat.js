const socket = io();

//dom elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

let queue = [];

btn.addEventListener('click', function(){
    socket.emit('chat:message', {
        username: username.value,
        message: message.value
    })
})

let i = 0;

function debugg(){
    console.log(i++);

}

function deleteFirstParrafo(){
    debugg()
    var primer_p = output.getElementsByTagName('p')[0];
    output.removeChild(primer_p);
    queue.shift();
    if(queue.length > 0){
        printParrafo(queue[0])
    }
}

function playAudio(text){
    const synth = window.speechSynthesis
    const utterThis = new SpeechSynthesisUtterance(text)
    synth.speak(utterThis)
}


function printParrafo(data){
    output.innerHTML = `
        <p>
            <strong>${data.username}</strong>: ${data.message}
        </p>
    `
    playAudio(data.message)
    setTimeout(deleteFirstParrafo, 10000);
}

socket.on('chat:message', function(data){
    queue.push(data);
    if(queue.length === 1){
        printParrafo(data);
    }
})