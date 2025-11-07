import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'
import 'dotenv/config';

class UserController{
    constructor(){}
    static prisma = new PrismaClient()
    static async createUser(req,res){
        try{
            const {name,surname,email,passwordHash,birth,country} = req.body
            await this.prisma.user.create({
                data:{
                    name:name,
                    surname:surname,
                    email:email,
                    passwordHash:await bcrypt.hash(passwordHash,10),
                    birth:new Date(birth),
                    country:country
                }
    })
    res.sendStatus(201)}
    catch(err){
        console.error(err)
        res.sendStatus(401)
    }
    }
    static async loginUser(req,res){
        try{
            const user = await this.prisma.user.findUnique(
                    {
                        where:{
                            email:req.body.email
                        }
                    }
                )
            if(!user || !await bcrypt.compare(req.body.passwordHash,user.passwordHash)){
              res.sendStatus(401)
            }else{
                const token = jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET)
                res.status(200).json({token})
            }
        } catch (err){
          console.error(err);
          res.sendStatus(500)
        }
    }  
}

export default UserController;