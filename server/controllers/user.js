const { addUser, getUsers } = require('../models/user');

exports.addUser = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await addUser({ username, email, password });
    res.json(user);
}

exports.getUsers = async (req, res) => {
    const users = await getUsers();
    res.json(users);
}
