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
  console.log('New WS connection...')

  socket.emit('message', 'Welcome to ChatCord!')
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Serving running on port ${PORT}`))