import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({msg: 'Prisijunk, kad gautum Token'})
    }

    const Token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(Token, process.env.JWT_SECRET);

        req.user = decoded;
        next()
    }catch(err){
        res.status(401).json({msg: 'Token negalioja'})
    }
}