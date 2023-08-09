const Router = require("express")
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const router = new Router()
const jwt = require('jsonwebtoken')
const authMiddlewear = require('../middlewear/authMiddlewear')

router.get('/',authMiddlewear, async (req,res)=>{
        try {
            const users = await User.find({ _id: { $ne: req.user.id } })
            return res.json({users})
        }catch (err){
            console.log(err)
            res.send({message: "Server error"})
        }
    })
module.exports = router