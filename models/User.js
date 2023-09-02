const {Schema, model, ObjectId} = require('mongoose');

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fullname: {type: String, required: true},
    username: {type: String},
    status: {type: String},
    avatar: {type: String},
    friends: [{type: ObjectId, ref: 'User'}],
    conversations: [{convId: {type: ObjectId, ref: 'Conversation'}, userId: {type: ObjectId, ref: 'User'}}]

})

module.exports = model('User', User)