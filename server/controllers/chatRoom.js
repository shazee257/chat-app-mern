const {
    addChatRoom,
    getChatRooms,
    getChatRoomById,
    addUserToChatRoom,
    addMessageToChatRoom,
    getChatRoomMessages
} = require('../models/chatRoom');

const { addMessage } = require('../models/message');

exports.addChatRoom = async (req, res) => {
    const { name } = req.body;
    const chatRoom = await addChatRoom({ name });
    res.json(chatRoom);
}

exports.getChatRooms = async (req, res) => {
    const chatRooms = await getChatRooms();
    res.json(chatRooms);
}

exports.getChatRoomById = async (req, res) => {
    const { roomId } = req.params;
    const chatRoom = await getChatRoomById(roomId);
    res.json(chatRoom);
}

exports.addUserToChatRoom = async (req, res) => {
    const { roomId, userId } = req.body;
    const chatRoom = await addUserToChatRoom(roomId, userId);
    res.json(chatRoom);
}

// exports.addMessageToChatRoom = async (req, res) => {
//     const { roomId, messageId } = req.body;
//     const chatRoom = await addMessageToChatRoom(roomId, messageId);
//     res.json(chatRoom);
// }

async function addMessageToRoom(roomId, messageId) {
    // add message to room
    const res = await addMessageToChatRoom(roomId, messageId);
    return res;
}





exports.getChatRoomMessages = async (req, res) => {
    const { roomId } = req.params;
    const messages = await getChatRoomMessages(roomId);
    res.json(messages);
}

// Socket.io event listener for new connections
exports.chatRoomsSocket = async (socket, io) => {
    console.log('A user connected');

    socket.emit('info', 'Welcome to the chat app');

    socket.on('sendMessage', (payload) => {
        // add message to db
        addMessage({
            senderId: payload.userId,
            message: payload.message
        }).then((message) => {
            console.log(message);
            // add message to room
            addMessageToRoom(payload.roomId, message._id).then((res) => {
                console.log(res);
                // send message
                socket.emit('sendMessage', { ...payload, _id: message._id });
            });
        });




        // console.log(payload);
        // io.emit('sendMessage', payload);
    });

    // // Join a chat room
    // socket.on('joinRoom', async ({ roomId, userId }) => {
    //     try {
    //         await addUserToChatRoom(roomId, userId);
    //         socket.join(roomId);
    //         io.to(roomId).emit('joined', { userId });

    //         // Send the messages to the user
    //         const messages = await getChatRoomMessages(roomId);
    //         io.to(roomId).emit('messages', { messages });
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // });

    // Send a new message to a chat room
    // socket.on('sendMessage', async ({ roomId, messageId }) => {
    //     try {
    //         await addMessageToChatRoom(roomId, messageId);
    //         const messages = await getChatRoomMessages(roomId);
    //         io.to(roomId).emit('messages', { messages });
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // });

    // Socket.io event listener for disconnections
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
}