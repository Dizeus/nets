const {Schema, model, ObjectId} = require('mongoose');

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fullname: {type: String, required: true},
    username: {type: String, unique: false},
    status: {type: String},
    avatar: {type: String, unique: false},
    posts: [{type: ObjectId, ref: 'Post'}],
    friends: [{type: ObjectId, ref: 'User'}],

})

module.exports = model('User', User)