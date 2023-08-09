const Router = require("express")
const Post = require("../models/Post");
const router = new Router()


router.post('/', async (req,res)=>{
        try {
            const {text, author} = req.body
            const post = new Post({text, likes: 0, author, date: Date.now()})
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
        const sortedPosts = posts.sort((a,b)=> {
            return b.date - a.date
        })
        console.log(sortedPosts)
        return res.json({sortedPosts})
    }catch (err){
        console.log(err)
        res.send({message: "Server error"})
    }
})
router.put('/like/:id',  async (req,res)=>{
    try {
        const postId = req.params.id
        const post = await Post.findOne({_id: postId})
        await Post.findOneAndUpdate(post, {likes: post.likes+1})
        const NewPost = await Post.findOne({_id: postId})
        return res.json(NewPost)
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