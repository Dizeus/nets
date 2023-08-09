const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')
const userRouter = require('./routes/user.routes')
const friendsRouter = require('./routes/friends.routes')
const app = express()
const PORT = config.get('serverPort')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/user', userRouter)
app.use('/api/friends', friendsRouter)
const start = async () =>{
    try{
        await mongoose.connect(config.get('dbUrl'))
        app.listen(PORT, ()=>{
            console.log(`Server run on PORT ${PORT}`)
        })
    }catch (err){

    }
}

start()

app.get("*", (req, res) => {
    res.send("Hello");
})