import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();



export const register = async(req,res)=>{
    const {email, password} = req.body;
    try{
        const hashed = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({data: {email, password: hashed}});
        res.status(201).json({
            status: "success",
        });
    }catch(err){
        res.status(400).json({
            msg: err.message
        })
    }
}

export const login = async(req,res)=>{
    const  {email, password} = req.body;
    try{
        const user = await prisma.user.findUnique({where:{email}});
        if(!user){
            return res.status(404).json({msg: 'vartotojas nerastas'})
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(401).json({msg: 'neteisingas slaptazodis'})
        }

        const token = jwt.sign(
            {id: user.id, email: user.email},
             process.env.JWT_SECRET, 
             {expiresIn: '1d'});
        res.json({token});
    }catch(err){
        res.status(500).json({msg: err.message})
    }
}