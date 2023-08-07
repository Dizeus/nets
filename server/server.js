const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')
const app = express()
const PORT = config.get('serverPort')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)

app.use('/api/posts', postRouter)
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