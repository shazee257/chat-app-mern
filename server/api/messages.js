const router = require('express').Router();

const {
    addMessage, getMessages, getMessageById
} = require('../controllers/messages');

router.post('/', addMessage);
router.get('/', getMessages);
router.get('/:id', getMessageById);

module.exports = router;

