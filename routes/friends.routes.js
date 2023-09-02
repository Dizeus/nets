const Router = require("express")
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const router = new Router()
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/auth.middleware')
const Post = require("../models/Post");

router.get('/',authMiddleware, async (req,res)=>{
        try {
            const users = await User.find({ _id: { $ne: req.user.id } })
            return res.json({users})
        }catch (err){
            console.log(err)
            res.send({message: "Server error"})
        }
    })
router.put('/:id', authMiddleware,  async (req,res)=>{
    try {
        const {isFollow} = req.body
        const friendId = req.params.id
        const user = await User.findOne({_id: req.user.id})
         isFollow? await User.findOneAndUpdate({_id: req.user.id}, {friends: [...user.friends, friendId]}):
             await User.findOneAndUpdate({_id: req.user.id}, {friends: user.friends.filter(x=>x!=friendId)});
        return res.json({message: "Successful unfollow"})
    }catch (err){
        console.log(err)
        res.send({message: "Server error"})
    }
})

module.exports = router