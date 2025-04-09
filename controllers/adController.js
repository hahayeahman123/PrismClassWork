import { PrismaClient } from "@prisma/client"
const Prisma = new PrismaClient();

export const getAllAds= async(req,res)=>{
    const ads = await Prisma.ad.findMany({include:{catagory:true, user: {select: {email:true}}}})
    res.status(200).json({ads})
}

export const createAd = async(req,res)=>{
    const {title, content, catagoryId} = req.body;
    try{
        const ad = await Prisma.ad.create({
            data:{
                title,
                content,
                catagoryId: parseInt(catagoryId),
                userId: req.user.id
            }
        });

        res.status(201).json({ad});
    }catch(err){
        res.status(404).json({msg: err.message})
    }
}   

export const updateAd = async (req,res)=>{
    const {id} =req.params;
    const ad = await Prisma.ad.findUnique({where: {id: parseInt(id)}});

    if(!ad || ad.userId !== req.user.id){
        return res.status(403).json({msg: 'Nerastas skelbimas, arba nesate sio skelbimo savininkas'})
    }
    const updated = await Prisma.ad.update({
        where: {id: parseInt(id)},
        data: req.body
    });

    res.status(201).json({updated})
}


export const deleteAd = async (req,res)=>{
    const {id}= req.params;
    const ad = await Prisma.ad.findUnique({where: {id: parseInt(id)}});

    if(!ad || ad.userId !== req.user.id){
        return res.status(403).json({msg: 'Nerastas skelbimas, arba nesate sio skelbimo savininkas'})
    }

    await Prisma.ad.delete({where: {id: parseInt(id)}})
    res.status(204).json({msg: 'deleted :)'})

}