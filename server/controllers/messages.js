const {
    addMessage, getMessages, getMessageById
} = require('../models/message');

exports.addMessage = async (req, res) => {
    const { message, sender } = req.body;
    const messageObj = await addMessage({ message, sender });
    res.json(messageObj);
}

exports.getMessages = async (req, res) => {
    const messages = await getMessages();
    res.json(messages);
}

exports.getMessageById = async (req, res) => {
    const { id } = req.params;
    const message = await getMessageById(id);
    res.json(message);
}