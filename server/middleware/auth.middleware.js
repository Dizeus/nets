const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    if(req.method === 'OPTIONS'){
        return next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            return  res.status(401).json({message: 'Auth failed'})
        }
        const decoded = jwt.verify(token, 'secret')
        req.user = decoded
        next()
    }catch (err){
        return res.status(401).json({message: 'Auth server error'})
    }
}