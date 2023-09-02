const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')
const userRouter = require('./routes/user.routes')
const friendsRouter = require('./routes/friends.routes')
const messageRouter = require('./routes/message.routes')
const fileUpload = require("express-fileupload")
const app = express()
const PORT = process.env.PORT || config.get('serverPort')
const cors = require('cors')
const filePathMiddleware = require('./middleware/filepath.middleware')
const path = require('path')
const root = path.join(__dirname, '../client', 'build')
app.use(express.static(root));
app.use(express.static('static'));
app.use(fileUpload({}))
app.use(cors())
app.use(filePathMiddleware(path.resolve(__dirname, './static')))
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/user', userRouter)
app.use('/api/friends', friendsRouter)
app.use('/api/messages', messageRouter)
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