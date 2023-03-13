const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const UserModel = model('User', userSchema);

exports.addUser = (obj) => UserModel.create(obj);

exports.getUsers = () => UserModel.find();



