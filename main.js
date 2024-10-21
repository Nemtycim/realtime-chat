const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const session = require('express-session');
const { Server } = require('socket.io');
const http = require('http')
require('dotenv').config();

mongoose.connect("", {
     useUnifiedTopology: true,
     useNewUrlParser: true,
});

const server = http.createServer(app);
const io = new Server(server);

app.use(session({ secret: 'realtime-chat', resave: true, saveUninitialized: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));
app.use('/assets', express.static(path.join(__dirname, './views/assets')));

const _get = require('./_routers/_get');
const _post = require('./_routers/_post');
require('./_utils/other.codes')
app.use('/', _get);
app.use('/', _post);

app.use((req, res, next) => {
  const err = new Error('Hay bi sal la');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

io.on('connection', (socket) => {
  console.log('Bir kullanıcı girdi');

  socket.on('chat message', (msg) => {
    //? console.log(`messageSender: ${msg.sender} | messageInfo: ${msg.message}`);
    io.emit('chat message', msg); // Broadcast the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('Bir Kullanıcı Cıktı');
  });
});


server.listen(3000, () => {
  console.log('3000 Portunda Başlatıldı.');
});
