const Router = require("express")
const Post = require("../models/Post");
const User = require("../models/User");
const router = new Router()


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

module.exports = router