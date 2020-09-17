const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '/build')));

//app.get('/', (req, res, next) => res.sendFile(__dirname + './index.html'));

if (process.env.NODE_ENV === 'production') {
  console.log("here");
  const path = require('path')
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, '/build')))
  // Anything that doesn't match the above, send back index.html
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/build/index.html'))
  })
}

// sockets test
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('test', (data) => {
    console.log("test data", data)
    io.sockets.emit('show_test', data)
  })

  socket.on('team_chat', (data) => {
    console.log("team_chat", data)
    io.sockets.emit('show_team_chat', data)
  })

  socket.on('network_message', (data) => {
    console.log("network_message", data)
    io.sockets.emit('show_network_message', data)
  })

  socket.on('view_messages', (data) => {
    io.sockets.emit('show_view_messages', data)
  })

  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(port);