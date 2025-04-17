import { PrismaClient } from "@prisma/client"
const Prisma = new PrismaClient();

/*export const getAllAds= async(req,res)=>{
    // we get the catagory Id
    const {catagoryId} = req.query;
    try{
        // we check if the catagory exists
        if(catagoryId){
            // this goes through if the catagory exists
            const catagory = await Prisma.catagory.findUnique({
                where: {id: parseInt(catagoryId)}
            })
            if(!catagory){
                res.status(404).json({msg: "nera priskirta kategorija reklamai arba kategorijos id nera"})
            }
        }
        if(!catagoryId){
            // this goes through if the catagory doesnt exist
            return res.status(404).json({
                msg: "kategorija nerasta"
            })
        }
        // we get the data if we have the cataogry with the 'where: {the thing we want}'
        const ads = await Prisma.Ad.findMany({
            where: {catagoryId: parseInt(catagoryId)},
            include:{
                catagory:true, 
                user: {
                    select: 
                    {email:true}
                }
            }
        })
        // we post the data we get
        res.status(200).json({ads})

    // in case of any error we do this
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }

}*/

export const getAllAds = async (req,res)=>{
    const {catagoryId, search} = req.query;

    try{

        const where = {};
        if(catagoryId){
            where.catagoryId = parseInt(catagoryId);
            const catagory = await Prisma.catagory.findUnique({
                where: {id: parseInt(catagoryId)}
        })

        }

        if(search){
            where.OR = [
                {title: {contains: search}},
                {content: {contains: search}}
            ] 
        }
        

         // we get the data if we have the cataogry with the 'where: {the thing we want}'
         const ads = await Prisma.ad.findMany({
            where,
            include:{
                catagory:true, 
                user: {
                    select: 
                    {email:true}
                }
            }
        })

        if(!search && !catagoryId){
            const ads = await Prisma.ad.findMany({
                include:{
                    catagory:true, 
                    user: {
                        select: 
                        {email:true}
                    }
                }
            })
        }
        // we post the data we get
        res.status(200).json({ads})
        
    // in case of errors
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
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