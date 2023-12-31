const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.routes")
const app = express()
const PORT = process.env.PORT || config.get('serverPort')
const corsMiddleware = require('./middleware/cors.middleware')
const path = require("path");
const postRouter = require('./routes/post.routes')
const userRouter = require('./routes/user.routes')
const friendsRouter = require('./routes/friends.routes')
const messageRouter = require('./routes/message.routes')

app.use(express.static('static'))

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, '../client/build')))
}

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/user', userRouter)
app.use('/api/friends', friendsRouter)
app.use('/api/messages', messageRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        app.get('/api/avatar/:image', (req, res) => {
            const filePath = path.resolve(req.filePath, req.params.image);
            console.log(filePath)
            res.sendFile(filePath);
        });

        app.get("*", (req, res) => {
            res.sendFile('index.html', { root: path.join(__dirname, '../client/build') });
        })

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })


    } catch (e) {
        console.log(e)
    }
}

start()

