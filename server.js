const path = require('path')
const express = require('express');
const http = require('http')
const socketio = require('socket.io')


const app = express();
const server = http.createServer(app)
const io = socketio(server)

// set static
app.use(express.static(path.join(__dirname, 'public')))

// Run when client connects
io.on('connection', socket => {
  // Welcome current user
  socket.emit('message', 'Welcome to ChatCord!')

  // Broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined a chat');

  // Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat')
  })

})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Serving running on port ${PORT}`))