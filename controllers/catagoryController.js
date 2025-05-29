import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();

export const GetCatagories = async(req,res)=>{
    const catagories = await Prisma.catagory.findMany();
    res.status(200).json({catagories});
}

export const createCatagory = async(req,res)=>{
    const {name} = req.body;
    const catagory = await Prisma.catagory.create({data: {name}})
    res.status(201).json({catagory});
}