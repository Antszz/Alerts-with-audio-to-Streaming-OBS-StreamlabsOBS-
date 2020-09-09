const path = require('path');
const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000)

//static file
app.use(express.static(path.join(__dirname, 'public')))

//star server
const server = app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
})

//websockets
const SocketIO = require('socket.io');
const io = SocketIO.listen(server);

function playAudio(text){
  const synth = window.speechSynthesis
  const utterThis = new SpeechSynthesisUtterance(text)
  synth.speak(utterThis)
}

io.on('connection', (socket) => {
  console.log('new connection', socket.id)

  socket.on('chat:message',(data) => {
    io.sockets.emit('chat:message', data);
  })
}) 
