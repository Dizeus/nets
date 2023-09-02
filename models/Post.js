const {Schema, model, ObjectId} = require('mongoose');

const Post = new Schema({
    text: {type: String, required: true},
    likes: {count: {type: Number}, likedBy: [{type: ObjectId, ref: 'User'}]},
    date: {type: Date},
    author: {type: ObjectId, ref: 'User', required: true}
})

module.exports = model('Post', Post)