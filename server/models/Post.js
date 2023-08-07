const {Schema, model, ObjectId} = require('mongoose');

const Post = new Schema({
    text: {type: String, required: true},
    likes: {type: Number},
    author: {type: ObjectId, ref: 'User', required: true}
})

module.exports = model('Post', Post)