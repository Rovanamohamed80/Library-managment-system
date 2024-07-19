import jwt from 'jsonwebtoken'
export const verifyToken =(req,res,next)=>{
    let {token} = req.headers;
    jwt.verify(token,'routeExam',async(err,decoded)=>{
        if(err)
        return res.status(401).json({message: "token error",err})
        console.log(decoded.id);
        req.user = decoded
        next()
})
}