const router = require('express').Router();

const { addUser, getUsers } = require('../controllers/user');

router.post('/', addUser);
router.get('/', getUsers);

module.exports = router;

