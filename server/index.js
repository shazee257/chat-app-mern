require('./db');
const userApi = require('./api/user');
const chatRoomApi = require('./api/chatRoom');
const messageApi = require('./api/messages');
const express = require('express');
const cors = require('cors');
const { chatRoomsSocket } = require('./controllers/chatRoom');
const { usersSocket } = require('./controllers/user');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: '*' }
});

app.use('/users', userApi);
app.use('/rooms', chatRoomApi);
app.use('/messages', messageApi);
// pass socket.io to the controller and io
io.on('connection', (socket) => chatRoomsSocket(socket, io));
// io.on('connection', (socket) => usersSocket(socket, io));

server.listen(5000, () => {
    console.log('server is listening on port 5000');
});