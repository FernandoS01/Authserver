import jwt from 'jsonwebtoken'
import 'dotenv/config'

function Auth(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    try {
    jwt.verify(token,process.env.JWT_SECRET)
    next()
    } catch(err){
    console.error(err)
    res.sendStatus(401)
    }
}

export default Auth;