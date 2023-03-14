const { Schema, model } = require('mongoose');

const chatRoomSchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

const ChatRoomModel = model('ChatRoom', chatRoomSchema);

exports.addChatRoom = (obj) => ChatRoomModel.create(obj);

exports.getChatRooms = () => ChatRoomModel.find();

exports.getChatRoomById = (id) => ChatRoomModel.findById(id);

exports.addUserToChatRoom = (roomId, userId) =>
    ChatRoomModel.findByIdAndUpdate
        ({ _id: roomId }, { $push: { users: userId } }, { new: true })
        .populate('users');

exports.addMessageToChatRoom = (roomId, messageId) =>
    ChatRoomModel.findByIdAndUpdate
        ({ _id: roomId }, { $push: { messages: messageId } }, { new: true })

exports.getChatRoomMessages = (roomId) =>
    ChatRoomModel.find({ _id: roomId })
        .populate('messages users');