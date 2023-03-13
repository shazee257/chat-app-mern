const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    senderId: { type: Schema.Types.ObjectId, ref: 'User' },
});

const MessageModel = model('Message', messageSchema);

exports.addMessage = (obj) => MessageModel.create(obj);

exports.getMessages = () => MessageModel.find();

exports.getMessageById = (id) => MessageModel.findById(id);
