const Router = require("express")
const User = require('../models/User')
const Conversation = require('../models/Conversation')
const router = new Router()
const authMiddlewear = require('../middlewear/authMiddlewear')
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");



router.get('/:id', authMiddlewear, async (req,res)=>{
        try {
            console.log(req.params.id)
            const conversation = await Conversation.findOne({part: [req.params.id, req.user.id]})
            const conversationReverse = await Conversation.findOne({part: [req.user.id, req.params.id]})
            if(conversation){
                const user1 = await User.findOne({_id: req.params.id})
                return res.json({conversationInfo: {conversation, userInfo: {avatar: user1.avatar, fullname: user1.fullname}}})
            }else if(conversationReverse){
                const user1 = await User.findOne({_id: req.params.id})
                return res.json({conversationInfo: {conversation: conversationReverse, userInfo: {avatar: user1.avatar, fullname: user1.fullname}}})
            }
            const newConversation = new Conversation({part:[req.params.id, req.user.id], messages: []})
            await newConversation.save()

            const user1 = await User.findOne({_id: req.params.id})
            user1.conversations.push({convId: newConversation._id, userId: req.user.id})
            await user1.save()

            const user2 = await User.findOne({_id: req.user.id})
            user2.conversations.push({convId: newConversation._id, userId: req.params.id})
            await user2.save()

            return res.json({conversationInfo: {conversation: newConversation, userInfo: {avatar: user1.avatar, fullname: user1.fullname}}})

        }catch (err){
            console.log(err)
            res.send({message: "Server error"})
        }
})
router.put('/', authMiddlewear,  async (req,res)=>{
    try {
        const {message, convId} = req.body
        const conversation = await Conversation.findOne({_id: convId})
        conversation.messages.push({text: message, author: req.user.id})
        await conversation.save()
        const user = await User.findOne({_id: (conversation.part[0]==req.user.id?conversation.part[1]:conversation.part[0])})
        return res.json({conversationInfo: {conversation: conversation, userInfo: {avatar: user.avatar, fullname: user.fullname}}})
    }catch (err){
        console.log(err)
        res.send({message: "Server error"})
    }
})

module.exports = router