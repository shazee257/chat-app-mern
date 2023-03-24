const router = require('express').Router();

const { addUser, getUsers } = require('../controllers/user');

router.post('/', addUser);

// pass socket.io to the controller and io
router.get('/', getUsers);

module.exports = router;

