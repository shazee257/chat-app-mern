const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: '*' }
});

io.on('connection', socket => {
    console.log('a user connected');
    console.log("socket ", socket.id);

    socket.on('chat', (payload) => {
        console.log("data ", payload);
        io.emit('chat', payload);
    });
});

server.listen(5000, () => {
    console.log('server is listening on port 5000');
});