const Router = require("express")
const {check, validationResult} = require("express-validator");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const router = new Router()


router.post('/', async (req,res)=>{
        try {
            const {text, author} = req.body
            console.log(text, author)
            const post = new Post({text, likes: 0, author})
            await post.save()
            return res.json('Post was created')
        }catch (err){
            console.log(err)
            res.send({message: "Server error post"})
        }
})

router.get('/',  async (req,res)=>{
    try {
        const posts = await Post.find({author: req.headers.id})
        return res.json({posts})
    }catch (err){
        console.log(err)
        res.send({message: "Server error"})
    }
})

module.exports = router