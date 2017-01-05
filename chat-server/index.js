const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors')
const fs = require('fs');
const _ = require('lodash');

let messages = [];

let connectedUsers = []

io.on('connection', function (socket) {
  socket.on('user connected', function (user) {
    console.log(user + ' connected');
    socket.broadcast.emit('user connected', user);
    connectedUsers.push({ id: socket.id, user });
  });

  socket.on('disconnect', function () {
    const user = _.find(connectedUsers, c => c.id === socket.id);
    if (typeof user !== 'undefined') {
      socket.broadcast.emit('user disconnected', user.user);
      connectedUsers = _.filter(connectedUsers, c => c.id !== socket.id);
    }
  });

  socket.on('chat message', function (msg) {
    console.log('message: ', msg);
    socket.broadcast.emit('chat message', msg);
    messages.push(msg);
  });

  socket.on('user name change', function (name) {
    if (!_.find(connectedUsers, c => c.user === name)) {
      console.log('user name change: ', name);
      const user = _.find(connectedUsers, c => c.id === socket.id);
      const prevName = user.user;
      user.user = name;

      socket.broadcast.emit('user name change', ({ prevName, newName: name }));
      messages.filter(m => m.sender === prevName).forEach(m => m.sender = name);
    }
  });

  socket.on('user typing', function(user) {
    socket.broadcast.emit('user typing', (user));
  });

  socket.on('user stop typing', function(user) {
    socket.broadcast.emit('user stop typing', (user));
  });
});

var router = express.Router();

router.get('/messages', function (req, res) {
  res.setHeader('Cache-Control', 'no-cache');
  res.json(messages);
});

router.get('/users', function (req, res) {
  res.setHeader('Cache-Control', 'no-cache');
  res.json(connectedUsers);
});


app.use(cors())
app.use('/api', router);

http.listen(3001, function () {
  console.log('listening on *:3001');
});
