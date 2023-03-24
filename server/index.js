require('./db');
const userApi = require('./api/user');
// const chatRoomApi = require('./api/chatRoom');
// const messageApi = require('./api/messages');
const express = require('express');
const cors = require('cors');
const socket = require('./socket');
// const { chatRoomsSocket } = require('./controllers/chatRoom');
// const userController = require('./controllers/user');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = require('http').createServer(app);
// const io = require('socket.io')(server, {
//     cors: { origin: '*' }
// });


const io = socket.init(server); // initialize socket.io and pass the server object
app.set('io', io); // set the 

// send socket.io to the controller
app.use('/users', userApi);

// pass socket.io to the controller and io
// io.on('connection', (socket) => chatRoomsSocket(socket, io));
// io.on('connection', (socket) => usersSocket(socket, io));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

server.listen(5000, () => {
    console.log('server is listening on port 5000');
});
