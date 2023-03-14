const router = require('express').Router();

const {
    addChatRoom,
    getChatRooms,
    getChatRoomById,
    addUserToChatRoom,
    addMessageToChatRoom,
    getChatRoomMessages
} = require('../controllers/chatRoom');

router.post('/', addChatRoom);
router.get('/', getChatRooms);
router.get('/messages/:roomId', getChatRoomMessages);
router.get('/:roomId', getChatRoomById);
router.put('/add-user', addUserToChatRoom);
router.put('/add-message', addMessageToChatRoom);

module.exports = router;

