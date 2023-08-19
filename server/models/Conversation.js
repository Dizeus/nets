const {Schema, model, ObjectId} = require('mongoose');

const Conversation = new Schema({
    part: [{type: ObjectId, ref: 'User'}],
    messages: [{text: {type: String}, author: {type: ObjectId, ref: 'User'}}],
})

module.exports = model('Conversation', Conversation)