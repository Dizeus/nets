const Router = require("express")
const Post = require("../models/Post");
const router = new Router()
const authMiddlewear = require('../middlewear/authMiddlewear')

router.post('/', async (req,res)=>{
        try {
            const {text, author} = req.body
            const post = new Post({text, likes: {count: 0, likedBy:[]}, author, date: Date.now()})
            await post.save()
            return res.json('Post was created')
        }catch (err){
            console.log(err)
            res.send({message: "Server error post"})
        }
})

router.get('/:id',  async (req,res)=>{
    try {
        const posts = await Post.find({author: req.params.id})
        const sortedPosts = posts.sort((a,b)=> {
            return b.date - a.date
        })
        return res.json({sortedPosts})
    }catch (err){
        console.log(err)
        res.send({message: "Server error"})
    }
})
router.put('/like/:id', async (req,res)=>{
    try {

        const postId = req.params.id
        const {userId} = req.body
        const post = await Post.findOne({_id: postId})
        if(!post.likes.likedBy.includes(userId)) {
            await Post.findOneAndUpdate(post, {
                likes: {
                    count: post.likes.count + 1,
                    likedBy: [...post.likes.likedBy, userId]
                }
            })
            const NewPost = await Post.findOne({_id: postId})
            return res.json(NewPost)
        }
    }catch (err){
        console.log(err)
        res.send({message: "Server error"})
    }
})

router.delete('/:id',  async (req,res)=>{
    try {
        const postId = req.params.id
        await Post.deleteOne({_id: postId})
        return res.json({message: "Successful deleted"})
    }catch (err){
        console.log(err)
        res.send({message: "Server error"})
    }
})

module.exports = router