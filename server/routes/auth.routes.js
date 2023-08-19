 const Router = require("express")
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const router = new Router()
const jwt = require('jsonwebtoken')
const authMiddlewear = require('../middlewear/authMiddlewear')
router.post('/signup',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 20').isLength({min:3, max:20})

    ],
    async (req,res)=>{
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({message: `Uncorrect request`, errors})
        }
        const {email, password, fullname} = req.body

        console.log(email, password, fullname)

        const isUserExist = await User.findOne({email})
        console.log(isUserExist)
        if(isUserExist){
            return res.status(400).json({message: `User with email ${email} already exist`})
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const user = new User({email, password: hashedPassword, fullname})
        await user.save()
        return res.json('User was created')
    }catch (err){
        console.log(err)
        res.send({message: "Server error"})
    }
})
router.post('/login',  async (req,res)=>{
    try {


        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message: `No user with email ${email}`})
        }
        const success = await bcrypt.compare(password, user.password);

        if(!success){
            return res.status(400).json({message: `Invalid password`})
        }

        const token = jwt.sign({id: user.id}, 'secret', { expiresIn: '1hr' })


        return res.json({
            token,
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
        res.send({message: "Server error"})
    }
})
 router.get('/auth', authMiddlewear,  async (req,res)=>{
    try {
        const user = await User.findOne({_id: req.user.id})
        const token = jwt.sign({id: user.id}, 'secret', { expiresIn: '1hr' })
        console.log(user)
        return res.json({
            token,
            user: {
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
        res.send({message: "Server error"})
    }
})

module.exports = router