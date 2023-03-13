require('./db');
const userApi = require('./api/user');
const chatRoomApi = require('./api/chatRoom');
const messageApi = require('./api/messages');
const express = require('express');
const { handleConnection } = require('./controllers/chatRoom');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: '*' }
});

app.use('/users', userApi);
app.use('/rooms', chatRoomApi);
app.use('/messages', messageApi);

io.on('connection', handleConnection);

server.listen(5000, () => {
    console.log('server is listening on port 5000');
});