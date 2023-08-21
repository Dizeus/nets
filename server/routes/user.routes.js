const Router = require("express")
const config = require('config')
const User = require("../models/User");
const authMiddlewear = require("../middlewear/authMiddlewear");
const router = new Router()
const uuid = require('uuid')
router.put('/', async (req,res)=>{
    try {

        const {fullname, username, status, id} = req.body
        await User.findOneAndUpdate({_id: id}, {status})
        await User.findOneAndUpdate({_id: id}, {fullname})
        await User.findOneAndUpdate({_id: id}, {username})
        const user = await User.findOne({_id: id})
        return res.json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                status: user.status,
                avatar: user.avatar,
                friends: user.friends,
                posts: user.posts,
                fullname: user.fullname
            }
        })
    }catch (err){
        console.log(err)
        res.send({message: "Server error post"})
    }
})

router.get('/:id', async (req,res)=>{
    try {
        const user = await User.findOne({_id: req.params.id})
        return res.json({
            user:{
                id: user.id,
                email: user.email,
                username: user.username,
                status: user.status,
                avatar: user.avatar,
                friends: user.friends,
                posts: user.posts,
                fullname: user.fullname
            }})
    }catch (err){
        console.log(err)
        res.send({message: "Server error profile"})
    }
})

router.post('/avatar', authMiddlewear, async (req,res)=>{
    try {
        console.log(req.files)
        const file = req.files.file
        const user = await User.findOne({_id: req.user.id})
        const avatarName = uuid.v4() + '.jpg'
        await file.mv(config.get('staticPath') + '\\' + avatarName)
        user.avatar = avatarName
        await user.save()
        return res.json({user})
    }catch (err){
        console.log(err)
        res.send({message: "Server error avatar"})
    }
})

router.get('/message/:id', async (req,res)=>{
    try {
        const user = await User.findOne({_id: req.params.id})
        return res.json({
            user:{
                id: user._id,
                avatar: user.avatar,
                fullname: user.fullname
            }})
    }catch (err){
        console.log(err)
        res.send({message: "Server error profile"})
    }
})


module.exports = router