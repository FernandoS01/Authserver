import express from 'express';
import Auth from '../Middlewares/Auth.js';
import UserController from '../Controllers/userController.js';

const router = express.Router();

router.get('/auth',Auth,(req,res)=>{    
    res.send("server working")
})
router.post('/login',(req,res)=>{
    UserController.loginUser(req,res)
})
router.post('/register',(req,res)=>{
    UserController.createUser(req,res)
})


export default router;